import React, { useEffect, useRef, useState } from "react";
import "./AsideMain.css";
import { useI18n } from "../../i18n/I18nProvider";

const prefersReduced =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupSmoothScroll() {
  const links = document.querySelectorAll(".aside-links a");
  const handleClick = (e) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
  };
  links.forEach((a) => a.addEventListener("click", handleClick));
  return () =>
    links.forEach((a) => a.removeEventListener("click", handleClick));
}

function setupTopbarScroll() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return () => {};
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    topbar.classList.toggle("scrolled", y > 6);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => document.removeEventListener("scroll", onScroll);
}

function AsideMain() {
  const { t, lang, setLang } = useI18n();
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef(null);
  const langToggleRef = useRef(null);

  useEffect(() => setupSmoothScroll(), []);
  useEffect(() => setupTopbarScroll(), []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(e.target) &&
        !langToggleRef.current.contains(e.target)
      ) {
        setLangOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navItems = [
    {
      id: "hero",
      tip: "tip_hero",
      className: "an-item",
      icon: "assets/home-logo.webp",
    },
    {
      id: "about",
      tip: "tip_about",
      className: "an-item",
      icon: "assets/about.webp",
    },
    {
      id: "features",
      tip: "tip_features",
      className: "an-item",
      icon: "assets/features.webp",
    },
    {
      id: "gallery",
      tip: "tip_gallery",
      className: "an-item",
      icon: "assets/gallery.webp",
    },
    {
      id: "contact",
      tip: "tip_contact",
      className: "an-item",
      icon: "assets/contact.webp",
    },
  ];

  return (
    <aside aria-label="section navigation" className="aside-nav">
      <a aria-label="home" href="#hero" className="aside-logo">
        <img src="logo.webp" alt="logo" />
      </a>

      <nav className="aside-links">
        {navItems.map(({ id, icon, tip, className }) => (
          <a
            key={id}
            href={`#${id}`}
            className={className}
            data-tip={t(tip) || id}
          >
            <img src={icon} alt={`${id}-icon`} />
          </a>
        ))}
      </nav>

      <div className="aside-bottom">
        <button
          ref={langToggleRef}
          aria-expanded={langOpen}
          aria-haspopup="listbox"
          className="lang-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setLangOpen((prev) => !prev);
          }}
        >
          <img
            src={`assets/${lang}.webp`}
            id="langCurrent"
            className="lang-logo"
            alt={lang.toUpperCase()}
          />
        </button>

        {langOpen && (
          <div
            className="lang-menu open"
            id="langMenu"
            role="listbox"
            ref={langMenuRef}
          >
            {["ru", "en"].map((lng) => (
              <button
                key={lng}
                className="lang-item"
                data-lang={lng}
                onClick={() => {
                  setLang(lng);
                  setLangOpen(false);
                }}
              >
                <img
                  src={`assets/${lng}.webp`}
                  className="lang-logo"
                  alt={lng.toUpperCase()}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default AsideMain;
