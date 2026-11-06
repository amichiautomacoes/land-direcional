param(
    [ValidateRange(1024, 65535)]
    [int]$Port = 5030,
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$nodeExecutable = (Get-Command node -ErrorAction Stop).Source
$nextExecutable = Join-Path $projectRoot 'node_modules\next\dist\bin\next'
$previewUrl = "http://127.0.0.1:$Port/"
$logDirectory = Join-Path $projectRoot 'runtime\logs'
$pidDirectory = Join-Path $projectRoot 'runtime\pids'

if (-not (Test-Path -LiteralPath $nextExecutable -PathType Leaf)) {
    throw 'As dependencias nao foram instaladas. Execute npm.cmd ci na raiz.'
}
$listener = Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue
if (-not $listener) {
    New-Item -ItemType Directory -Path $logDirectory, $pidDirectory -Force | Out-Null
    $serverProcess = Start-Process -FilePath $nodeExecutable `
        -ArgumentList @(('"{0}"' -f $nextExecutable), 'dev', '--hostname', '127.0.0.1', '--port', [string]$Port) `
        -WorkingDirectory $projectRoot -WindowStyle Hidden `
        -RedirectStandardOutput (Join-Path $logDirectory "site-$Port.log") `
        -RedirectStandardError (Join-Path $logDirectory "site-$Port.error.log") `
        -PassThru
    $serverProcess.Id | Set-Content -LiteralPath (Join-Path $pidDirectory "site-$Port.pid") -Encoding ASCII
}

$ready = $false
for ($attempt = 0; $attempt -lt 30; $attempt++) {
    try {
        $page = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 5
        if ($page.StatusCode -eq 200 -and $page.Content -match 'id="hero-title"') { $ready = $true; break }
    } catch {
        if ($listener) { throw "A porta $Port esta ocupada por outra aplicacao." }
        Start-Sleep -Milliseconds 200
    }
}
if (-not $ready) { throw "A landing page nao respondeu. Consulte runtime/logs/site-$Port.error.log." }
if (-not $NoBrowser) { Start-Process -FilePath $previewUrl }
Write-Output "Direcional pronta em $previewUrl"
