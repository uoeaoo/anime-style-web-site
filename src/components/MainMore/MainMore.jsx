import React, { useState } from "react";
import "./MainMore.css";
import { useI18n } from "../../i18n/I18nProvider";
import ExpandablePanel from "./ExpandablePanel";

function MainMore() {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section" id="more" aria-label={t("sm_section_aria")}>
      <div className="wrap">
        <ExpandablePanel
          title={t("sm_title")}
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          moreLabel={t("sm_show_more")}
          lessLabel={t("sm_show_less")}
        >
          <p>{t("sm_p1")}</p>
          <p>{t("sm_p2")}</p>
          <p>{t("sm_p3")}</p>
          <p>{t("sm_p4")}</p>
          <p>{t("sm_p5")}</p>
        </ExpandablePanel>
      </div>
    </section>
  );
}

export default MainMore;
