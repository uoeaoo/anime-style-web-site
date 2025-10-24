import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header/Header";
import AsideMain from "./components/AsideMain/AsideMain";
import PagesWrap from "./components/PagesWrap/PagesWrap";
import Hero from "./components/Hero/Hero";
import MainPageAbout from "./components/MainPageAbout/MainPageAbout";
import MainMore from "./components/MainMore/MainMore";
import Footer from "./components/Footer/Footer";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import { I18nProvider } from "./i18n/I18nProvider";

function App() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <I18nProvider forceRemountOnLang={true}>
      <div className="App">
        <AsideMain />
        <Header
          onOpenLogin={() => setLoginOpen(true)}
          onOpenRegister={() => setRegisterOpen(true)}
        />
        <main>
          <Hero />
          <PagesWrap />
          <MainPageAbout />
          <MainMore />
        </main>
        <Footer />
        <RegisterModal
          open={registerOpen}
          onClose={() => setRegisterOpen(false)}
          onSuccess={() => setRegisterOpen(false)}
        />

        <CookieBanner />
      </div>
    </I18nProvider>
  );
}

export default App;
