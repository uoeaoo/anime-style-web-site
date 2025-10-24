import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const I18nContext = createContext({
  t: (k, vars) => k,
  lang: "ru",
  setLang: () => {},
  ready: false,
  dict: {},
});

const LANGS = ["ru", "en"];

async function loadDict(lang) {
  const selected = LANGS.includes(lang) ? lang : "ru";
  try {
    const res = await fetch(`/i18n/${selected}.json`, { cache: "no-store" });
    if (!res.ok) throw new Error("i18n not found");
    const data = await res.json();
    localStorage.setItem("lang", selected);
    return { data, selected };
  } catch (e) {
    console.error("Ошибка загрузки перевода:", e);
    return { data: {}, selected };
  }
}

function interpolate(str, vars = {}) {
  if (typeof str !== "string") return str;
  return str.replace(/\{(\w+)\}/g, (_, k) =>
    k in vars ? String(vars[k]) : `{${k}}`
  );
}

export function I18nProvider({ children, forceRemountOnLang = false }) {
  const [lang, setLang] = useState(() => {
    return (
      localStorage.getItem("lang") ||
      (typeof navigator !== "undefined"
        ? (navigator.language || "ru").slice(0, 2)
        : "ru")
    );
  });
  const [dict, setDict] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    setReady(false);
    (async () => {
      const { data, selected } = await loadDict(lang);
      if (!alive) return;
      setDict(data);
      if (selected !== lang) {
        setLang(selected);
      }
      setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, [lang]);

  const t = useCallback(
    (key, vars) => {
      const val = dict?.[key];
      if (val == null) return key;
      if (typeof val === "string") return interpolate(val, vars);
      return val;
    },
    [dict]
  );

  const value = useMemo(
    () => ({ t, lang, setLang, ready, dict }),
    [t, lang, ready, dict]
  );

  const remountKey = forceRemountOnLang ? lang : "app";

  return (
    <I18nContext.Provider value={value}>
      <div key={remountKey}>{children}</div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
