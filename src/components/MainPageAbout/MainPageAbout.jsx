import React from "react";
import "./MainPageAbout.css";
import { useI18n } from "../../i18n/I18nProvider";

function MainPageAbout() {
  const { t } = useI18n();

  return (
    <section
      className="section"
      id="about"
      aria-label={t("about_section_aria")}
    >
      <div className="wrap grid-about">
        <div>
          <header className="sec-head">
            <h3>{t("about_title")}</h3>
          </header>

          <p className="muted">{t("about_text_1")}</p>
          <p className="muted">{t("about_text_2")}</p>

          <ul className="ticks" aria-label={t("about_list_aria")}>
            <li>{t("about_li_1")}</li>
            <li>{t("about_li_2")}</li>
            <li>{t("about_li_3")}</li>
          </ul>
        </div>

        <div className="info-card" aria-label={t("contact_card_aria")}>
          <h4>{t("contact_title")}</h4>
          <p className="muted">
            <span>{t("contact_company")}</span>
            <br />
            <a href={`mailto:${t("contact_email")}`}>{t("contact_email")}</a>
            <br />
            <span>{t("contact_hours")}</span>
          </p>

          <a href="/about" className="btn ghost">
            {t("menu_about")}
          </a>
          <a href="/contact" className="btn">
            {t("menu_contact")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default MainPageAbout;
