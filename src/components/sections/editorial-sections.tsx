"use client";

import { useState } from "react";
import { brand } from "@/content/brand";
import { purchaseSteps } from "@/content/purchase";
import { PropertyImage } from "../property-image";
import { useProperty } from "../property-provider";

export function PurchaseProcess() {
  const { selected } = useProperty();
  const [openStep, setOpenStep] = useState<string | null>(purchaseSteps[0].title);
  return <section className="section purchase-section" id="como-comprar" aria-labelledby="process-title"><div className="container purchase-layout">
    <div className="purchase-copy"><h2 id="process-title" data-reveal>Da escolha<br /> ao seu novo apê</h2>
      <div className="purchase-steps">{purchaseSteps.map((step) => <details key={step.title} name="purchase-process" className="purchase-step" open={openStep === step.title} data-reveal onToggle={(event) => {
        if (event.currentTarget.open) setOpenStep(step.title);
        else setOpenStep((current) => current === step.title ? null : current);
      }}><summary>{step.title}<span aria-hidden="true">+</span></summary><p>{step.text}</p></details>)}</div>
      <a className="text-link" href="#contato">Vamos conversar <span aria-hidden="true">↗</span></a>
    </div>
    <figure className="purchase-image" data-reveal><PropertyImage data-image="aerial" src={selected.images.aerial} alt={`Perspectiva ilustrativa do projeto ${selected.name}`} /><figcaption>Um projeto para imaginar a sua próxima fase.</figcaption></figure>
  </div></section>;
}

export function PurchaseConfidence() {
  return <section className="confidence-section" aria-labelledby="confidence-title"><div className="container confidence-layout">
    <div><h2 id="confidence-title" data-reveal>Você faz planos.<br /> A gente orienta.</h2><p data-reveal>Da primeira conversa às dúvidas depois da compra, conte com os canais de atendimento da Direcional.</p><a className="button button-white" href={brand.portal} target="_blank" rel="noopener" data-reveal>Conheça o Pode Morar <span aria-hidden="true">↗</span></a></div>
    <div className="confidence-details" data-reveal><p><strong>Converse com quem conhece</strong>Atendimento oficial para falar sobre o apartamento e as condições do empreendimento.</p><p><strong>Continue perto depois da compra</strong>No Pode Morar, clientes podem consultar documentos, boletos e informações sobre as obras.</p></div>
  </div></section>;
}

export function NextStep() {
  return <section className="section next-step-section" aria-labelledby="next-step-title"><div className="container"><h2 id="next-step-title" data-reveal>O próximo capítulo<br /> tem a sua cara.</h2><p data-reveal>Uma sala para receber. Um canto para desacelerar.<br /> Um endereço para viver o que vem pela frente.</p><a className="text-link" href="#contato" data-reveal>Encontre seu próximo apê <span aria-hidden="true">↗</span></a></div></section>;
}
