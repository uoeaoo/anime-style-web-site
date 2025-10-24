import React from "react";
import "./Header.css";
import { useI18n } from "../../i18n/I18nProvider";

function Header({ onOpenLogin, onOpenRegister }) {
  const { t } = useI18n();

  return (
    <header className="topbar">
      <div className="wrap">
        <div className="brand-row">
          <span className="pill">{t("hdr_licensed_pill")}</span>
        </div>

        <nav className="auth" aria-label={t("hdr_auth_nav_label")}>
          <button className="btn ghost" onClick={onOpenLogin}>
            {t("nav_login")}
          </button>
          <button className="btn" onClick={onOpenRegister}>
            {t("nav_register")}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
