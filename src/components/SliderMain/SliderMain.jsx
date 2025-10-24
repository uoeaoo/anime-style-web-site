import React, { useEffect, useMemo, useRef, useState } from "react";
import "./SliderMain.css";
import Slide from "../Slide/Slide";
import { useI18n } from "../../i18n/I18nProvider";

function SliderMain() {
  const { t } = useI18n();
  const containerRef = useRef(null);
  const slidesRef = useRef(null);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const slides = useMemo(
    () => [
      {
        bg: "https://klev.club/uploads/posts/2023-10/1697809026_klev-club-p-arti-anime-klinok-rassekayushchii-demonov-38.jpg",
        titleKey: "slider_first_title",
        descriptionKey: "slider_first_description",
        buttons: [
          { labelKey: "cta_register", variant: "", dataOpen: "register" },
          { labelKey: "cta_login", variant: "ghost", dataOpen: "login" },
        ],
      },
      {
        bg: "https://getwallpapers.com/wallpaper/full/9/2/c/667554.jpg",
        titleKey: "slider_second_title",
        descriptionKey: "slider_second_description",
        pillKey: "slider_second_pill",
      },
      {
        bg: "https://images6.alphacoders.com/791/thumb-1920-791100.jpg",
        titleKey: "slider_third_title",
        descriptionKey: "slider_third_description",
        pillKey: "slider_third_pill",
      },
    ],
    []
  );

  const total = slides.length;

  useEffect(() => {
    const el = slidesRef.current;
    if (!el) return;
    el.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  const start = () => {
    clearInterval(timerRef.current);
    if (prefersReduced) return;
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % total),
      5000
    );
  };
  const pause = () => clearInterval(timerRef.current);

  useEffect(() => {
    start();
    return () => clearInterval(timerRef.current);
  }, [prefersReduced, total]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onEnter = () => pause();
    const onLeave = () => start();
    const onVis = () => (document.hidden ? pause() : start());

    node.addEventListener("pointerenter", onEnter);
    node.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      node.removeEventListener("pointerenter", onEnter);
      node.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [prefersReduced, total]);

  return (
    <div
      ref={containerRef}
      aria-label={t("slider_aria_label")}
      aria-roledescription="carousel"
      className="carousel"
      id="carousel"
    >
      <div className="slides" ref={slidesRef}>
        {slides.map((s, i) => (
          <Slide key={i} {...s} />
        ))}
      </div>

      <div aria-label={t("slider_dots_aria")} className="dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot${i === index ? " active" : ""}`}
            aria-label={t("slider_dot_aria", { n: i + 1 })}
            aria-current={i === index ? "true" : undefined}
            onClick={() => {
              setIndex(i);
              start();
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default SliderMain;
