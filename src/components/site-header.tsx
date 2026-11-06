"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [["#apartamentos", "Apartamentos"], ["#como-comprar", "Como comprar"], ["#plantas", "Plantas"]] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);

  useEffect(() => {
    const query = matchMedia("(min-width: 1100px)");
    const close = () => setOpen(false);
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    navigation.current?.querySelector("a")?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);

  return <header className="site-header">
    <div className="container header-inner">
      <Link className="brand-link" href="/" aria-label="Direcional, início"><img src="/images/brand/direcional.svg" width={174} height={23} alt="Direcional" /></Link>
      <nav className="desktop-nav" aria-label="Navegação principal">{links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="header-actions">
        <a className="text-link header-contact" href="#contato">Fale com a gente</a>
        <a className="button button-small" href="#encontre">Encontrar meu apê <span aria-hidden="true">↗</span></a>
        <button ref={toggle} className="menu-toggle" type="button" aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
      </div>
    </div>
    <nav ref={navigation} className="mobile-nav" id="mobile-navigation" aria-label="Navegação mobile" hidden={!open}>
      {[...links, ["#contato", "Fale com a gente"]].map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
  </header>;
}
