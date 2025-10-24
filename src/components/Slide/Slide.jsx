import React from "react";
import PropTypes from "prop-types";
import { useI18n } from "../../i18n/I18nProvider";
import "../SliderMain/SliderMain.css";

function Slide({ bg, titleKey, descriptionKey, pillKey, buttons = [] }) {
  const { t } = useI18n();

  return (
    <article
      className="slide"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="copy">
        <h1>{t(titleKey)}</h1>
        {descriptionKey ? <p className="muted">{t(descriptionKey)}</p> : null}

        {pillKey ? <span className="pill">{t(pillKey)}</span> : null}

        {buttons.length > 0 && (
          <div className="row">
            {buttons.map((b, i) => (
              <button
                key={i}
                className={`btn ${b.variant || ""}`.trim()}
                data-open={b.dataOpen}
                aria-label={t(b.labelKey)}
              >
                {t(b.labelKey)}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

Slide.propTypes = {
  bg: PropTypes.string.isRequired,
  titleKey: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string,
  pillKey: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      labelKey: PropTypes.string.isRequired,
      variant: PropTypes.oneOf(["", "ghost", "outline"]),
      dataOpen: PropTypes.oneOf(["login", "register"]),
    })
  ),
};

export default Slide;
