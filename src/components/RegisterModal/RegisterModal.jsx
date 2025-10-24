import React, { useEffect, useMemo, useRef, useState } from "react";
import "./RegisterModal.css";
import { useI18n } from "../../i18n/I18nProvider";

const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const rePassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

function FieldMsg({ id, text }) {
  if (!text) return null;
  return (
    <div className="msg" id={id} aria-live="polite">
      {text}
    </div>
  );
}

export default function RegisterModal({ open, onClose, onSuccess }) {
  const { t, lang } = useI18n();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [country, setCountry] = useState("RU");
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [errEmail, setErrEmail] = useState("");
  const [errPass, setErrPass] = useState("");
  const [errPass2, setErrPass2] = useState("");

  const sheetRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPass("");
      setPass2("");
      setErrEmail("");
      setErrPass("");
      setErrPass2("");
      setShowPass1(false);
      setShowPass2(false);
    }
  }, [open]);

  const validateEmail = () => {
    const ok = reEmail.test(email.trim());
    setErrEmail(
      ok
        ? ""
        : t("err_email_format", {
            def: 'Enter a valid email address (must contain "@" and ".").',
          })
    );
    return ok;
  };

  const validatePass = () => {
    const ok = rePassword.test(pass);
    setErrPass(
      ok
        ? ""
        : t("err_password_rules", {
            def: "At least 8 characters with a letter, a number and a special symbol.",
          })
    );
    return ok;
  };

  const validatePass2 = () => {
    const ok = !!pass2 && pass === pass2;
    setErrPass2(
      ok ? "" : t("err_password_match", { def: "Passwords do not match." })
    );
    return ok;
  };

  const validateAll = () =>
    [validateEmail(), validatePass(), validatePass2()].every(Boolean);

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) {
      onSuccess?.();
    }
  };

  const countries = useMemo(
    () => [
      { code: "RU", label: t("country_RU") },
      { code: "US", label: t("country_US") },
      { code: "FR", label: t("country_FR") },
    ],
    [lang, t]
  );

  if (!open) return null;

  return (
    <div
      className="modal modern open"
      id="modal-register"
      role="dialog"
      aria-modal="true"
      aria-labelledby="registerTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="sheet" role="document" ref={sheetRef}>
        <button
          className="close-x"
          aria-label={t("modal_close")}
          onClick={onClose}
        >
          ✕
        </button>

        <aside className="sheet-aside" aria-hidden="true">
          <div className="artgrain"></div>
          <div className="aside-copy">
            <h5>{t("register_aside_title")}</h5>
            <p>{t("register_aside_text")}</p>
          </div>
        </aside>

        <div className="sheet-main">
          <header className="sheet-head">
            <h4 id="registerTitle">{t("register_title")}</h4>
          </header>

          <form className="form-grid" noValidate onSubmit={onSubmit}>
            <div
              className={`field float ${
                errEmail ? "invalid" : email ? "valid" : ""
              }`}
              id="fEmail"
            >
              <span className="label">{t("label_email")}</span>
              <input
                type="email"
                id="regEmail"
                autoComplete="email"
                placeholder={t("ph_email")}
                aria-invalid={!!errEmail}
                aria-describedby="errEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
              <FieldMsg id="errEmail" text={errEmail} />
            </div>

            <div
              className={`field float with-eye ${
                errPass ? "invalid" : pass ? "valid" : ""
              }`}
              id="fPass"
            >
              <span className="label">{t("label_password")}</span>
              <input
                type={showPass1 ? "text" : "password"}
                id="regPass"
                autoComplete="new-password"
                placeholder={t("ph_password_hint")}
                aria-invalid={!!errPass}
                aria-describedby="errPass"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  if (errPass) setErrPass("");
                }}
                onBlur={validatePass}
              />
              <button
                className="eye"
                type="button"
                aria-label={showPass1 ? t("eye_hide") : t("eye_show")}
                onClick={() => setShowPass1((v) => !v)}
              >
                👁
              </button>
              <FieldMsg id="errPass" text={errPass} />
            </div>

            <div
              className={`field float with-eye ${
                errPass2 ? "invalid" : pass2 ? "valid" : ""
              }`}
              id="fPass2"
            >
              <span className="label">{t("label_password2")}</span>
              <input
                type={showPass2 ? "text" : "password"}
                id="regPass2"
                autoComplete="new-password"
                placeholder={t("ph_password_repeat")}
                aria-invalid={!!errPass2}
                aria-describedby="errPass2"
                value={pass2}
                onChange={(e) => {
                  setPass2(e.target.value);
                  if (errPass2) setErrPass2("");
                }}
                onBlur={validatePass2}
              />
              <button
                className="eye"
                type="button"
                aria-label={showPass2 ? t("eye_hide") : t("eye_show")}
                onClick={() => setShowPass2((v) => !v)}
              >
                👁
              </button>
              <FieldMsg id="errPass2" text={errPass2} />
            </div>

            <div className="field float">
              <span className="label">{t("label_country")}</span>
              <select
                id="regCountry"
                autoComplete="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="row end">
              <button
                style={{ marginTop: "10px" }}
                className="btn solid expand"
                id="regSubmit"
                type="submit"
              >
                {t("cta_create")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
