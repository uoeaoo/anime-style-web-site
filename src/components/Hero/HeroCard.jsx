import React from "react";
import PropTypes from "prop-types";
import { useI18n } from "../../i18n/I18nProvider";

function HeroCard({
  icon,
  titleKey,
  textKey,
  buttons = [],
  showButtons = false,
}) {
  const { t } = useI18n();

  return (
    <div className="card">
      <div className="row">
        {icon ? <img src={icon} alt="" width={20} height={20} /> : null}
        <strong>{t(titleKey)}</strong>
      </div>
      <p className="muted">{t(textKey)}</p>

      {showButtons && buttons?.length > 0 && (
        <div className="card-actions">
          {buttons.map((btn, i) => (
            <a
              key={i}
              href={btn.href || "#"}
              className={`btn ${btn.variant || ""}`.trim()}
              aria-label={t(btn.labelKey)}
            >
              {t(btn.labelKey)}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

HeroCard.propTypes = {
  icon: PropTypes.string,
  titleKey: PropTypes.string.isRequired,
  textKey: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      labelKey: PropTypes.string.isRequired,
      href: PropTypes.string,
      variant: PropTypes.oneOf(["", "ghost", "outline"]),
    })
  ),
  showButtons: PropTypes.bool,
};

export default HeroCard;
