import React from "react";
import "./Hero.css";
import SliderMain from "../SliderMain/SliderMain";
import HeroCards from "./HeroCards";
import HeroTicker from "./HeroTicker";

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="wrap grid-hero">
        <SliderMain />
        <HeroCards />
      </div>
      <HeroTicker />
    </section>
  );
}

export default Hero;
