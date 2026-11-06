"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import type { GalleryImage } from "@/types/property";
import { PropertyImage } from "./property-image";
import { useProperty } from "./property-provider";

interface MediaState { items: readonly GalleryImage[]; index: number }
type OpenMedia = (items: readonly GalleryImage[], index: number, trigger: HTMLElement) => void;
const MediaContext = createContext<OpenMedia | null>(null);

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const { selected } = useProperty();
  const [media, setMedia] = useState<MediaState | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const image = media?.items[media.index] ?? selected.gallery[0];

  const openMedia = useCallback<OpenMedia>((items, index, element) => {
    if (items.length === 0) return;
    trigger.current = element;
    setMedia({ items, index: ((index % items.length) + items.length) % items.length });
  }, []);

  useEffect(() => {
    if (media && !dialog.current?.open) dialog.current?.showModal();
  }, [media]);

  const move = (offset: number) => setMedia((current) => current && ({
    ...current, index: (current.index + offset + current.items.length) % current.items.length,
  }));

  return <MediaContext.Provider value={openMedia}>
    {children}
    <dialog ref={dialog} className="lightbox" id="media-lightbox" aria-labelledby="lightbox-title" onClose={() => {
      setMedia(null);
      trigger.current?.focus({ preventScroll: true });
    }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={(event) => {
      if (!media || media.items.length < 2) return;
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    }}>
      <div className="lightbox-toolbar"><p id="lightbox-title">{image.title}</p><button className="icon-button" type="button" data-lightbox-close aria-label="Fechar imagem" onClick={() => dialog.current?.close()}>×</button></div>
      <div className="lightbox-image"><PropertyImage id="lightbox-image" src={image.image} alt={image.alt} /></div>
      <div className="lightbox-bottom">
        <p id="lightbox-description">{image.note ?? "Perspectiva ilustrativa. Imagem oficial do empreendimento."}</p>
        <a className="text-link" id="lightbox-original" href={image.image} target="_blank" rel="noopener">Ver original ↗</a>
        <div className="gallery-navigation" id="lightbox-navigation" hidden={!media || media.items.length < 2}>
          <button className="icon-button" data-lightbox-previous type="button" aria-label="Imagem anterior" onClick={() => move(-1)}>←</button>
          <span id="lightbox-count" aria-live="polite">{media ? `${media.index + 1} / ${media.items.length}` : "1 / 1"}</span>
          <button className="icon-button" data-lightbox-next type="button" aria-label="Próxima imagem" onClick={() => move(1)}>→</button>
        </div>
      </div>
    </dialog>
  </MediaContext.Provider>;
}

export function MediaLink({ items, index = 0, children, ...props }: Omit<ComponentProps<"a">, "href"> & {
  items: readonly GalleryImage[];
  index?: number;
}) {
  const open = useContext(MediaContext);
  if (!open) throw new Error("MediaLink deve estar dentro de MediaProvider.");
  return <a {...props} href={items[index]?.image} onClick={(event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    props.onClick?.(event);
    open(items, index, event.currentTarget);
  }}>{children}</a>;
}
