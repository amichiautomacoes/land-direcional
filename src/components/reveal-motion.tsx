"use client";

import { useEffect } from "react";

export function RevealMotion() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.classList.add("has-entered");
        observer.unobserve(target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
