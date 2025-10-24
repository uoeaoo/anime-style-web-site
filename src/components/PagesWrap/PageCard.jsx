import React from "react";
import PropTypes from "prop-types";
import { useI18n } from "../../i18n/I18nProvider";
import "./PagesWrap.css";

function PageCard({
  href,
  imgSrc,
  imgAltKey,
  titleKey,
  textKey,
  primaryCtaKey,
  primaryHref,
  showLogin = true,
}) {
  const { t } = useI18n();

  return (
    <article className="pages-card">
      <a href={href} aria-label={t(imgAltKey)} className="thumb">
        <img src={imgSrc} alt={t(imgAltKey)} />
      </a>

      <div className="body">
        <strong>{t(titleKey)}</strong>
        <p className="muted">{t(textKey)}</p>

        <div className="actions">
          <a href={primaryHref} className="btn">
            {t(primaryCtaKey)}
          </a>

          {showLogin && (
            <button
              className="btn outline"
              data-open="login"
              aria-label={t("nav_login")}
            >
              {t("nav_login")}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

PageCard.propTypes = {
  href: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAltKey: PropTypes.string.isRequired,
  titleKey: PropTypes.string.isRequired,
  textKey: PropTypes.string.isRequired,
  primaryCtaKey: PropTypes.string.isRequired,
  primaryHref: PropTypes.string.isRequired,
  showLogin: PropTypes.bool,
};

export default PageCard;
