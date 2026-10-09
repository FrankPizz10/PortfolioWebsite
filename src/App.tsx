import React from "react";
import { Route, Routes } from "react-router-dom";

import { Skills, Header, About, Resume, MobileApp, ChessApp, Contact } from "./container/";
import { Navbar } from "./components/";
import Starfield from "./components/Starfield";

import "./App.scss";

const Cosmos = () => (
  <div className="cosmos" aria-hidden="true">
    <Starfield />
    <div className="nebula nebula-a" />
    <div className="nebula nebula-b" />
    <div className="nebula nebula-c" />
  </div>
);

const Footer = () => (
  <footer className="site-footer">
    <span className="sig">◈</span> designed &amp; engineered by Frank Pizzella — transmitting from deep space
  </footer>
);

const Missions = () => (
  <section id="missions" className="section">
    <span className="section-kicker">03 // Missions</span>
    <h2 className="section-title">
      Things I&apos;ve <span className="grad">launched</span>
    </h2>
    <p className="section-lede">
      Side projects that escaped the lab — a social beer-tracking app live on the
      App Store, and a two-player chess game with every rule enforced.
    </p>
    <div className="missions-grid">
      <MobileApp />
      <ChessApp />
    </div>
  </section>
);

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <Cosmos />
            <div className="app__content">
              <Navbar />
              <Header />
              <About />
              <Skills />
              <Missions />
              <Contact />
              <Footer />
            </div>
          </div>
        }
      />
      <Route
        path="/resume"
        element={
          <div className="app">
            <Cosmos />
            <div className="app__content">
              <Navbar />
              <Resume />
              <Footer />
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
