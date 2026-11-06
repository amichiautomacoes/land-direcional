"use client";

import { useState } from "react";
import { properties } from "@/content/properties";
import { propertyPath } from "@/lib/properties";
import type { Property, PropertyId } from "@/types/property";
import { MediaLink } from "../media-provider";
import { PropertyImage } from "../property-image";
import { PropertyLink } from "../property-link";
import { useProperty } from "../property-provider";

export function Hero() {
  const { selected, selectProperty } = useProperty();
  const [region, setRegion] = useState({ propertyId: selected.id, value: selected.region });
  const currentRegion = region.propertyId === selected.id ? region.value : selected.region;

  return <section className="hero" aria-labelledby="hero-title"><div className="container hero-content">
    <h1 id="hero-title" data-reveal>Seu apê é D+</h1>
    <p className="hero-description" data-reveal>Conheça os apartamentos Direcional e encontre<br /> espaço para a sua próxima fase.</p>
    <form className="region-form js-only" id="encontre" action="/#apartamentos" method="get" data-region-form data-reveal onSubmit={(event) => {
      event.preventDefault();
      const property = properties.find((item) => item.region === currentRegion);
      if (property) selectProperty(property.id, { scroll: true });
    }}>
      <div className="region-field"><label htmlFor="hero-region">Onde você quer morar?</label><select id="hero-region" name="regiao" value={currentRegion} onChange={(event) => setRegion({ propertyId: selected.id, value: event.target.value })}>
        {properties.map((property) => <option key={property.id} value={property.region}>{property.city} · {property.state}</option>)}
      </select></div>
      <button className="button" type="submit">Encontrar meu apê <span aria-hidden="true">↗</span></button>
    </form>
    <noscript><nav className="region-form" aria-label="Escolher cidade">{properties.map((property) => <a key={property.id} className="text-link" href={`${propertyPath(property.id)}#apartamentos`}>{property.city} · {property.state}</a>)}</nav></noscript>
    <figure className="hero-visual" data-reveal>
      <PropertyImage data-image="hero" src={selected.images.hero} alt={`Perspectiva ilustrativa da fachada do ${selected.name}`} sizes="(max-width: 767px) 180vw, 100vw" preload />
      <figcaption><span><strong data-property="name">{selected.name}</strong><span data-property-location>{selected.city} · {selected.state}</span></span><span className="image-disclaimer">Perspectiva ilustrativa</span></figcaption>
    </figure>
  </div></section>;
}

export function PropertyShowcase() {
  const { selected } = useProperty();
  const showcaseIndex = Math.max(0, selected.gallery.findIndex((image) => image.image === selected.images.showcase));
  return <section className="section property-section" id="apartamentos" aria-labelledby="properties-title" data-selected-property={selected.id}>
    <div className="container">
      <div className="section-intro" data-reveal><h2 id="properties-title">Seu lugar está aqui</h2><p>Cada cidade tem um jeito de viver.<br /> Conheça os apartamentos que selecionamos para você.</p></div>
      <nav className="property-tabs" aria-label="Escolha um empreendimento" data-reveal>{properties.map((property) => <PropertyLink key={property.id} propertyId={property.id} scroll className={`property-tab${selected.id === property.id ? " is-active" : ""}`} aria-current={selected.id === property.id ? "true" : undefined}><span>{property.city}</span><span className="tab-state">{property.state}</span></PropertyLink>)}</nav>
      <div className="property-showcase" data-reveal>
        <MediaLink className="showcase-image" items={selected.gallery} index={showcaseIndex} data-gallery-open data-gallery-showcase aria-label="Ampliar imagens do empreendimento">
          <PropertyImage data-image="showcase" src={selected.images.showcase} alt={`Perspectiva ilustrativa de um ambiente do ${selected.name}`} />
          <span className="image-action">Explorar ambientes <span aria-hidden="true">↗</span></span>
        </MediaLink>
        <div className="property-information">
          <div><p className="property-location" data-property-location>{selected.city} · {selected.state}</p><h3 data-property="name">{selected.name}</h3></div>
          <dl className="property-facts"><div><dt>Seu espaço</dt><dd data-property="rooms">{selected.rooms}</dd></div><div><dt data-property="area_note">{selected.areaNote}</dt><dd data-property="area">{selected.area}</dd></div></dl>
          <a className="button button-blue" data-contact-link href={selected.contact} target="_blank" rel="noopener">Quero conhecer <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <p className="media-note">Perspectivas ilustrativas. Consulte tipologias e disponibilidade com a equipe do empreendimento.</p>
    </div>
  </section>;
}

export function RegionStrip() {
  return <aside className="region-strip container" aria-label="Cidades nesta seleção"><span>Novos endereços.<br /> Novas possibilidades.</span>{properties.map((property) => <PropertyLink key={property.id} propertyId={property.id} scroll><strong>{property.city}</strong><span>{property.state}</span></PropertyLink>)}</aside>;
}

export function PropertyFeatures() {
  const { selected } = useProperty();
  return <section className="section features-section" aria-labelledby="features-title"><div className="container">
    <div className="section-intro" data-reveal><h2 id="features-title">Viva além da porta</h2><div><p>O seu apê é só o começo. Descubra espaços para encontrar, descansar e aproveitar a vida perto de casa.</p><a className="text-link" href="#galeria">Conheça os ambientes <span aria-hidden="true">↗</span></a></div></div>
    <div className="feature-gallery">
      <figure className="feature-primary" data-reveal><MediaLink items={selected.gallery} data-gallery-open data-gallery-index="0" aria-label="Ampliar perspectiva da piscina"><PropertyImage data-image="pool" src={selected.images.pool} alt={`Perspectiva ilustrativa da piscina do ${selected.name}`} /></MediaLink><figcaption><strong>Mais tempo para aproveitar</strong><p>Piscina e momentos de lazer no <span data-property="name">{selected.name}</span>.</p></figcaption></figure>
      <figure className="feature-secondary" data-reveal><MediaLink items={selected.gallery} index={1} data-gallery-open data-gallery-index="1" aria-label="Ampliar ambiente do empreendimento"><PropertyImage data-image="living" src={selected.images.living} alt={`Perspectiva ilustrativa de ambiente do ${selected.name}`} /></MediaLink><figcaption><strong data-property="living_label">{selected.livingLabel}</strong><p data-property="living_description">{selected.livingDescription}</p></figcaption></figure>
    </div>
  </div></section>;
}

function Tour({ property }: { property: Property }) {
  const [index, setIndex] = useState(0);
  const image = property.gallery[index];
  const move = (offset: number) => setIndex((current) => (current + offset + property.gallery.length) % property.gallery.length);
  return <section className="section tour-section" id="galeria" aria-labelledby="tour-title"><div className="container">
    <div className="section-intro" data-reveal><h2 id="tour-title">Imagine a vida aqui</h2><p>Um olhar mais de perto para o <span data-property="name">{property.name}</span>.<br /> Explore as perspectivas do empreendimento.</p></div>
    <figure className="tour-stage" data-reveal>
      <MediaLink items={property.gallery} index={index} data-gallery-open data-gallery-current aria-label="Ampliar a imagem da galeria"><PropertyImage id="tour-image" src={image.image} alt={image.alt} /></MediaLink>
      <figcaption className="tour-controls"><div><strong id="tour-title-current">{image.title}</strong><span>Perspectiva ilustrativa</span></div><div className="gallery-navigation js-only"><button className="icon-button" type="button" data-tour-previous aria-label="Imagem anterior" onClick={() => move(-1)}>←</button><span id="tour-count" aria-live="polite">{index + 1} / {property.gallery.length}</span><button className="icon-button" type="button" data-tour-next aria-label="Próxima imagem" onClick={() => move(1)}>→</button></div></figcaption>
    </figure>
  </div></section>;
}

export function PropertyTour() {
  const { selected } = useProperty();
  return <Tour key={selected.id} property={selected} />;
}

export function LocationOptions() {
  return <section className="section location-section" aria-labelledby="locations-title"><div className="container location-content"><h2 id="locations-title" data-reveal>Mais perto<br /> do que importa</h2><p data-reveal>O bairro, os caminhos de todo dia, os seus planos.<br /> Escolha onde você quer começar essa história.</p><div className="location-links" data-reveal>{properties.map((property) => <PropertyLink key={property.id} propertyId={property.id} scroll>{property.city} <span>{property.state}</span><span aria-hidden="true">↗</span></PropertyLink>)}</div></div></section>;
}

export function FloorPlans() {
  const { selectProperty } = useProperty();
  return <section className="section plans-section" id="plantas" aria-labelledby="plans-title"><div className="container">
    <div className="plans-heading"><h2 id="plans-title" data-reveal>Seu jeito de morar<br /> começa na planta</h2><p data-reveal>Conheça a distribuição dos ambientes e encontre espaço para a sua rotina.</p></div>
    <div className="plan-gallery">{properties.map((property) => <article key={property.id} className="plan-item" data-reveal>
      <MediaLink items={[{ image: property.images.plan, title: `Planta · ${property.name}`, alt: `Planta ilustrada do ${property.name}`, note: property.planNote }]} data-plan-open={property.id} aria-label={`Ampliar planta do ${property.name}`} onClick={() => selectProperty(property.id)}>
        <PropertyImage src={property.images.plan} alt={`Planta ilustrada do ${property.name}`} /><span className="plan-zoom">Ampliar planta <span aria-hidden="true">+</span></span>
      </MediaLink>
      <p>{property.city} · {property.state}</p><h3>{property.name}</h3><span className="plan-rooms">{property.rooms}</span>
    </article>)}</div>
    <p className="media-note">Plantas ilustrativas de tipologias selecionadas. Áreas, medidas e características variam conforme a unidade.</p>
  </div></section>;
}

export function DeliveryStories() {
  return <section className="section stories-section" aria-labelledby="stories-title"><div className="container">
    <div className="section-intro" data-reveal><h2 id="stories-title">Um endereço.<br /> Muitos começos.</h2><p>Do primeiro plano ao encontro com o seu novo lugar.<br /> Conheça três projetos e escolha o seu próximo passo.</p></div>
    <div className="story-gallery">{properties.map((property) => <PropertyLink key={property.id} className="property-story" propertyId={property.id} scroll data-reveal><PropertyImage src={property.images.hero} alt={`Perspectiva ilustrativa da fachada do ${property.name}`} /><div><p>{property.city} · {property.state}</p><h3>{property.name}</h3><span>Conhecer o projeto <span aria-hidden="true">↗</span></span></div></PropertyLink>)}</div>
  </div></section>;
}

export function Contact() {
  const { selected, selectProperty } = useProperty();
  return <section className="contact-section" id="contato" aria-labelledby="contact-title"><div className="container contact-layout">
    <figure className="contact-photo"><PropertyImage src="/images/properties/nature-varzea-sala.jpg" alt="Perspectiva ilustrativa da sala do Nature Várzea" /><figcaption>Nature Várzea · Recife, PE · Perspectiva ilustrativa</figcaption></figure>
    <div className="contact-copy"><h2 id="contact-title" data-reveal>Vamos encontrar<br /> o seu apê?</h2><p data-reveal>Escolha o empreendimento e converse com a equipe oficial pelo WhatsApp. Seus planos podem começar com uma boa conversa.</p>
      <div className="contact-form" data-reveal>
        <label className="js-only" htmlFor="contact-property">Sobre qual apartamento vamos conversar?</label>
        <select className="js-only" id="contact-property" data-contact-select value={selected.id} onChange={(event) => selectProperty(event.target.value as PropertyId)}>{properties.map((property) => <option key={property.id} value={property.id}>{property.name} · {property.city}</option>)}</select>
        <a className="button" data-contact-link href={selected.contact} target="_blank" rel="noopener">Falar com a equipe <span aria-hidden="true">↗</span></a>
        <p className="form-note">Você será direcionado ao WhatsApp oficial do empreendimento.</p>
        <noscript><p>Atendimento por empreendimento:</p>{properties.map((property) => <a key={property.id} className="text-link" href={property.contact} target="_blank" rel="noopener">{property.name} ↗</a>)}</noscript>
      </div>
    </div>
  </div></section>;
}
