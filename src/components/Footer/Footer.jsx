import React from "react";
import "./Footer.css";
import { useI18n } from "../../i18n/I18nProvider";

function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const brand = t("footer_brand");

  return (
    <footer aria-label={t("footer_aria_label")}>
      <div className="footer-top wrap">
        <div className="footer-brand">
          <div className="row">
            <img
              src="logo.webp"
              alt={t("footer_logo_alt", { brand })}
              width={32}
              height={32}
            />
            <strong>{brand}</strong>
          </div>
          <p className="muted">{t("footer_tagline")}</p>
        </div>

        <nav className="footer-col" aria-label={t("footer_nav_label")}>
          <ul>
            <li>
              <a href="/privacy">{t("nav_privacy")}</a>
            </li>
            <li>
              <a href="/terms">{t("nav_terms")}</a>
            </li>
            <li>
              <a href="/cookies">{t("nav_cookies")}</a>
            </li>
            <li>
              <a href="/faq">{t("nav_faq")}</a>
            </li>
            <li>
              <a href="/contact">{t("nav_contact")}</a>
            </li>
            <li>
              <a href="/about">{t("nav_about")}</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="badges" aria-label={t("footer_badges_label")}>
        <img src="/assets/community.webp" alt={t("badge_community")} />
        <img src="/assets/fair-use.webp" alt={t("badge_fairuse")} />
        <img src="/assets/discussions.webp" alt={t("badge_open")} />
        <img src="/assets/fans.webp" alt={t("badge_fans")} />
        <img src="/assets/creative.webp" alt={t("badge_creative")} />
        <img src="/assets/non-profit.webp" alt={t("badge_nonprofit")} />
      </div>

      <div className="footer-bottom">
        <small>{t("footer_rights", { year, brand })}</small>
      </div>
    </footer>
  );
}

export default Footer;
