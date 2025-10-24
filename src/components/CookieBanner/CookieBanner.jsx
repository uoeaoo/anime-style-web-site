import React, { useEffect, useState } from "react";
import "./CookieBanner.css";
import { useI18n } from "../../i18n/I18nProvider";
import CookiePrefs from "./CookiePrefs";

const STORAGE_KEY = "cookieConsent";

function readConsent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function writeConsent({ analytics = false, marketing = false }) {
  const payload = {
    necessary: true,
    analytics: !!analytics,
    marketing: !!marketing,
    ts: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

export default function CookieBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const ex = readConsent();
    if (!ex) {
      setVisible(true);
    } else {
      setAnalytics(!!ex.analytics);
      setMarketing(!!ex.marketing);
    }
  }, []);

  const acceptAll = () => {
    writeConsent({ analytics: true, marketing: true });
    setVisible(false);
    setPrefsOpen(false);
  };

  const rejectAll = () => {
    writeConsent({ analytics: false, marketing: false });
    setVisible(false);
    setPrefsOpen(false);
  };

  const openPrefs = () => {
    const ex = readConsent();
    if (ex) {
      setAnalytics(!!ex.analytics);
      setMarketing(!!ex.marketing);
    }
    setPrefsOpen(true);
  };

  const savePrefs = () => {
    writeConsent({ analytics, marketing });
    setVisible(false);
    setPrefsOpen(false);
  };

  if (!visible) return null;

  return (
    <>
      <div
        aria-label={t("cookie_aria_label")}
        aria-live="polite"
        className="cookie-banner"
        id="cookieBanner"
        role="dialog"
      >
        <div className="cookie-inner">
          <div className="cookie-copy">
            <strong>{t("cookie_title")}</strong>
            <p>{t("cookie_body")}</p>
            <a className="cookie-link" href="/cookies">
              {t("cookie_policy")}
            </a>
          </div>

          <div className="cookie-actions">
            <button className="btn" id="cookieAccept" onClick={acceptAll}>
              {t("cookie_accept")}
            </button>
            <button className="btn ghost" id="cookieReject" onClick={rejectAll}>
              {t("cookie_reject")}
            </button>
            <button
              className="btn outline"
              id="cookiePrefsBtn"
              onClick={openPrefs}
            >
              {t("cookie_settings")}
            </button>
          </div>
        </div>
      </div>

      <CookiePrefs
        open={prefsOpen}
        analytics={analytics}
        marketing={marketing}
        onChange={(patch) => {
          if (typeof patch.analytics === "boolean")
            setAnalytics(patch.analytics);
          if (typeof patch.marketing === "boolean")
            setMarketing(patch.marketing);
        }}
        onClose={() => setPrefsOpen(false)}
        onSave={savePrefs}
      />
    </>
  );
}
