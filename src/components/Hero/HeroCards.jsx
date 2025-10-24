import React from "react";
import "./HeroCards.css";
import { useI18n } from "../../i18n/I18nProvider";
import HeroCard from "./HeroCard";

function HeroCards({ show = true, showButtons = false }) {
  const { t } = useI18n();

  if (!show) return null;

  const cards = [
    {
      icon: "/assets/icons/chat.svg",
      titleKey: "hero_card_1_title",
      textKey: "hero_card_1_text",
      buttons: [
        {
          labelKey: "hero_card_btn_discuss",
          href: "/discussions",
          variant: "",
        },
        { 
          labelKey: "hero_card_btn_rules", 
          href: "/rules", 
          variant: "ghost" 
        },
      ],
    },
    {
      icon: "/assets/icons/blog.svg",
      titleKey: "hero_card_2_title",
      textKey: "hero_card_2_text",
      buttons: [
        { 
          labelKey: "hero_card_btn_blog", 
          href: "/blog", 
          variant: "" 
        },
        {
          labelKey: "hero_card_btn_guides",
          href: "/guides",
          variant: "outline",
        },
      ],
    },
    {
      icon: "/assets/icons/calendar.svg",
      titleKey: "hero_card_3_title",
      textKey: "hero_card_3_text",
      buttons: [
        { 
          labelKey: "hero_card_btn_events", 
          href: "/events", 
          variant: ""           
        },
      ],
    },
  ];

  return (
    <div className="hero-cards" aria-label={t("hero_cards_aria")}>
      {cards.map((card, idx) => (
        <HeroCard
          key={idx}
          icon={card.icon}
          titleKey={card.titleKey}
          textKey={card.textKey}
          buttons={card.buttons}
          showButtons={showButtons}
        />
      ))}
    </div>
  );
}

export default HeroCards;
