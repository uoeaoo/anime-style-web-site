import React from "react";
import PropTypes from "prop-types";
import { useI18n } from "../../i18n/I18nProvider";
import "./CookieBanner.css";

export default function CookiePrefs({
  open,
  analytics,
  marketing,
  onChange,
  onClose,
  onSave,
}) {
  const { t } = useI18n();
  if (!open) return null;

  return (
    <div
      className="cookie-prefs"
      role="dialog"
      aria-modal="true"
      aria-label={t("cookie_prefs_title")}
    >
      <div className="cookie-prefs-inner">
        <header className="cookie-prefs-head">
          <strong>{t("cookie_prefs_title")}</strong>
          <button
            className="icon-btn"
            aria-label={t("cookie_close")}
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <p className="muted">{t("cookie_prefs_intro")}</p>

        <ul className="cookie-list">
          <li className="cookie-item">
            <div className="cookie-item-row">
              <strong>{t("cookie_cat_necessary")}</strong>
              <span className="tag">{t("cookie_required")}</span>
            </div>
            <p className="muted">{t("cookie_cat_necessary_desc")}</p>
          </li>

          <li className="cookie-item">
            <div className="cookie-item-row">
              <strong>{t("cookie_cat_analytics")}</strong>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => onChange({ analytics: e.target.checked })}
                />
                <span className="slider" />
              </label>
            </div>
            <p className="muted">{t("cookie_cat_analytics_desc")}</p>
          </li>

          <li className="cookie-item">
            <div className="cookie-item-row">
              <strong>{t("cookie_cat_marketing")}</strong>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => onChange({ marketing: e.target.checked })}
                />
                <span className="slider" />
              </label>
            </div>
            <p className="muted">{t("cookie_cat_marketing_desc")}</p>
          </li>
        </ul>

        <div className="cookie-prefs-actions">
          <button className="btn ghost" onClick={onClose}>
            {t("cookie_cancel")}
          </button>
          <button className="btn" onClick={onSave}>
            {t("cookie_save")}
          </button>
        </div>
      </div>
    </div>
  );
}

CookiePrefs.propTypes = {
  open: PropTypes.bool.isRequired,
  analytics: PropTypes.bool.isRequired,
  marketing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
