import { brand } from "@/content/brand";

export function SiteFooter() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-main">
      <a className="brand-link" href="#conteudo" aria-label="Voltar ao início"><img src="/images/brand/direcional.svg" width={174} height={23} alt="Direcional" /></a>
      <p>Aqui, seu apê é D+.</p>
      <div><a href={brand.instagram} target="_blank" rel="noopener">Instagram ↗</a><a href={brand.portal} target="_blank" rel="noopener">Portal do cliente ↗</a></div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Direcional. Imagens e projetos: <a href={brand.website} target="_blank" rel="noopener">Direcional Engenharia</a>.</p><a href={brand.privacy} target="_blank" rel="noopener">Privacidade</a></div>
    <p className="footer-disclaimer">Perspectivas artísticas e plantas ilustrativas. Consulte a equipe oficial para confirmar disponibilidade, tipologias, acabamentos, registro de incorporação e condições do empreendimento. A comercialização depende dos requisitos aplicáveis a cada projeto.</p>
  </div></footer>;
}
