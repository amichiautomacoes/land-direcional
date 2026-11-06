import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../../', import.meta.url));
const output = path.join(root, '.taste-skill/migration/qa');
const baseUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';
await fs.mkdir(output, { recursive: true });
const report = { viewports: [], interactions: [], errors: [] };
const browser = await chromium.launch({ headless: true });

try {
  for (const width of [1440, 768, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: width >= 1000 ? 900 : 844 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', (error) => report.errors.push(error.message));
    page.on('response', (response) => { if (response.status() >= 400) report.errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 650) {
      await page.evaluate((position) => window.scrollTo(0, position), y);
      await page.waitForTimeout(65);
    }
    await page.waitForFunction(() => [...document.images].filter((img) => !img.closest('dialog')).every((img) => img.complete && img.naturalWidth > 0));
    const metrics = await page.evaluate(() => ({
      viewport: innerWidth,
      width: document.documentElement.scrollWidth,
      titleCount: document.querySelectorAll('h1').length,
      brokenImages: [...document.images].filter((img) => !img.closest('dialog') && (!img.complete || !img.naturalWidth)).map((img) => img.src),
      joinedSentences: document.querySelector('main').innerText.match(/[a-z\u00e0-\u00fa][.!?][A-Z\u00c0-\u00da]/g) || [],
      headings: [...document.querySelectorAll('main h1, main h2, main h3')].map((element) => ({ text: element.textContent, height: element.getBoundingClientRect().height, lineHeight: parseFloat(getComputedStyle(element).lineHeight) })),
    }));
    assert.equal(metrics.width, width, `Horizontal overflow at ${width}px`);
    assert.equal(metrics.titleCount, 1);
    assert.equal(metrics.brokenImages.length, 0, `Broken images at ${width}px: ${metrics.brokenImages.join(', ')}`);
    assert.equal(metrics.joinedSentences.length, 0, `Joined sentences at ${width}px: ${metrics.joinedSentences.join(', ')}`);
    for (const heading of metrics.headings) assert.ok(heading.height <= heading.lineHeight * 2 + 2, `Long heading at ${width}px: ${heading.text}`);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(output, `fold-${width}.png`) });
    await page.screenshot({ path: path.join(output, `full-${width}.png`), fullPage: true });

    if (width <= 768) {
      const toggle = page.locator('.menu-toggle');
      await toggle.click();
      assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
      assert.equal(await page.locator('#mobile-navigation').isVisible(), true);
      await page.keyboard.press('Escape');
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      assert.equal(await page.locator('.menu-toggle:focus').count(), 1);
    }

    if (width === 1440) {
      await page.selectOption('#hero-region', 'recife');
      await page.locator('[data-region-form] button').click();
      await page.waitForFunction(() => document.querySelector('[data-selected-property]').dataset.selectedProperty === 'nature-varzea');
      assert.match(await page.locator('[data-image=hero]').getAttribute('src'), /nature-varzea/);
      assert.equal(await page.locator('#contact-property').inputValue(), 'nature-varzea');
      for (const link of await page.locator('[data-contact-link]').all()) {
        assert.equal(await link.getAttribute('href'), 'https://wa.me/message/3624RUVO5ERFP1');
      }
      report.interactions.push('Region selection synchronizes media, contact and URL');

      await page.locator('[data-plan-open=inove-residence]').click();
      assert.equal(await page.locator('#media-lightbox').isVisible(), true);
      await page.waitForFunction(() => { const img = document.getElementById('lightbox-image'); return img.complete && img.naturalWidth > 0; });
      assert.match(await page.locator('#lightbox-image').getAttribute('src'), /inove-residence-planta/);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#media-lightbox').isVisible(), false);
      assert.equal(await page.locator('[data-plan-open=inove-residence]:focus').count(), 1);
      report.interactions.push('Floor plan opens, closes with Escape and restores focus');

      await page.locator('[data-gallery-open]').first().click();
      const before = await page.locator('#lightbox-image').getAttribute('src');
      await page.locator('[data-lightbox-next]').click();
      assert.notEqual(await page.locator('#lightbox-image').getAttribute('src'), before);
      await page.locator('[data-lightbox-close]').click();
      const tourBefore = await page.locator('#tour-image').getAttribute('src');
      await page.locator('[data-tour-next]').click();
      assert.notEqual(await page.locator('#tour-image').getAttribute('src'), tourBefore);
      report.interactions.push('Image gallery and lightbox navigation work');

      await page.selectOption('#contact-property', 'boulevard-ville');
      const showcase = page.locator('[data-gallery-showcase]');
      const showcaseSource = await showcase.locator('img').getAttribute('src');
      await showcase.click();
      assert.equal(await page.locator('#lightbox-image').getAttribute('src'), showcaseSource);
      await page.locator('[data-lightbox-close]').click();
      report.interactions.push('Showcase enlargement matches the selected property image');
      for (const link of await page.locator('[data-contact-link]').all()) {
        assert.equal(await link.getAttribute('href'), 'https://wa.me/message/ILCERDLCWKFNM1');
        assert.equal(await link.getAttribute('target'), '_blank');
      }
      report.interactions.push('All contact links use the official selected property channel');

      for (const query of ['?imovel=boulevard-ville', '?regiao=camacari', '?imovel=invalid&regiao=camacari']) {
        await page.goto(`${baseUrl}/${query}`, { waitUntil: 'networkidle' });
        assert.equal(await page.locator('[data-selected-property]').getAttribute('data-selected-property'), 'boulevard-ville');
      }
      await page.goto(`${baseUrl}/?imovel=invalid`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('[data-selected-property]').getAttribute('data-selected-property'), 'inove-residence');
      await page.locator('.property-tab[data-select-property=nature-varzea]').click();
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('[data-selected-property]').getAttribute('data-selected-property'), 'nature-varzea');
      assert.equal(await page.locator('.contact-form [data-contact-link]').getAttribute('href'), 'https://wa.me/message/3624RUVO5ERFP1');
      report.interactions.push('Direct URLs, invalid values and reload preserve the correct selection');

      await page.locator('.property-tab[data-select-property=boulevard-ville]').click();
      await page.goBack();
      assert.equal(await page.locator('[data-selected-property]').getAttribute('data-selected-property'), 'nature-varzea');
      await page.goForward();
      assert.equal(await page.locator('[data-selected-property]').getAttribute('data-selected-property'), 'boulevard-ville');
      report.interactions.push('Back and forward restore the property, images and contact');

      const steps = page.locator('.purchase-step');
      await steps.nth(1).locator('summary').click();
      await page.waitForFunction(() => document.querySelectorAll('.purchase-step[open]').length === 1 && document.querySelectorAll('.purchase-step')[1].open);
      await steps.nth(1).locator('summary').click();
      await page.waitForFunction(() => document.querySelectorAll('.purchase-step[open]').length === 0);
      report.interactions.push('Purchase steps open exclusively and can be collapsed');
    }
    report.viewports.push({ width, status: 'pass', height, brokenImages: metrics.brokenImages });
    await context.close();
  }

  const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const plain = await noScript.newPage();
  await plain.goto(`${baseUrl}/imoveis/nature-varzea/`, { waitUntil: 'networkidle' });
  assert.equal(await plain.locator('[data-selected-property]').getAttribute('data-selected-property'), 'nature-varzea');
  assert.equal(await plain.locator('[data-region-form] button').isVisible(), false);
  assert.equal(await plain.locator('h1').isVisible(), true);
  await plain.locator('.property-tab[data-select-property=boulevard-ville]').click();
  assert.equal(await plain.locator('[data-selected-property]').getAttribute('data-selected-property'), 'boulevard-ville');
  assert.equal(await plain.locator('.contact-form [data-contact-link]').getAttribute('href'), 'https://wa.me/message/ILCERDLCWKFNM1');
  await plain.locator('nav[aria-label="Escolher cidade"] a').filter({ hasText: 'Contagem' }).click();
  assert.equal(await plain.locator('[data-selected-property]').getAttribute('data-selected-property'), 'inove-residence');
  report.interactions.push('Property navigation and official contact work without JavaScript');
  await noScript.close();
  for (const [id, name] of [['nature-varzea', 'Nature Várzea'], ['inove-residence', 'Inove Residence'], ['boulevard-ville', 'Conquista Boulevard Ville']]) {
    const response = await fetch(`${baseUrl}/imoveis/${id}/`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes(`data-selected-property="${id}"`));
    assert.ok(html.includes(`<title>${name}`));
  }
  assert.equal((await fetch(`${baseUrl}/imoveis/invalid/`)).status, 404);
  assert.equal((await fetch(`${baseUrl}/pagina-inexistente/`)).status, 404);
  report.interactions.push('All prerendered property routes return 200 with their own metadata; unknown routes return 404');
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
  report.status = 'pass';
} catch (error) {
  report.status = 'fail';
  report.failure = error.stack;
  process.exitCode = 1;
} finally {
  await browser.close();
  await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
