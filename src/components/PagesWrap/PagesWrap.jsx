import React, { useMemo } from "react";
import "./PagesWrap.css";
import { useI18n } from "../../i18n/I18nProvider";
import PageCard from "./PageCard";

function PagesWrap() {
  const { t } = useI18n();

  const cards = useMemo(
    () => [
      {
        href: "/blog",
        imgSrc:
          "https://4kwallpapers.com/images/wallpapers/jujutsu-kaisen-2560x2560-24150.jpg",
        imgAltKey: "pages_blog_alt",
        titleKey: "pages_blog_title",
        textKey: "pages_blog_text",
        primaryCtaKey: "pages_blog_cta",
        primaryHref: "/blog",
      },
      {
        href: "/news",
        imgSrc:
          "https://4kwallpapers.com/images/wallpapers/castorice-5k-anime-2560x2560-22295.jpg",
        imgAltKey: "pages_news_alt",
        titleKey: "pages_news_title",
        textKey: "pages_news_text",
        primaryCtaKey: "pages_news_cta",
        primaryHref: "/news",
      },
    ],
    []
  );

  return (
    <section
      className="section"
      id="pages"
      aria-label={t("pages_section_aria")}
    >
      <div className="wrap">
        <header className="sec-head">
          <h3>{t("pages_title")}</h3>
        </header>

        <div className="pages">
          {cards.map((c, i) => (
            <PageCard key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PagesWrap;
