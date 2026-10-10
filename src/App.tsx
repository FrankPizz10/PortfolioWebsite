import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Skills, Header, About, Resume, MobileApp, ChessApp, Contact } from "./container/";
import { Navbar } from "./components/";
import Starfield from "./components/Starfield";

import "./App.scss";

/** Reset scroll on every route change so the résumé page always opens at the top. */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

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
    <span className="sig">◈</span> designed &amp; engineered by Frank Pizzella in Staten Island, NY
  </footer>
);

const Projects = () => (
  <section id="projects" className="section">
    <span className="section-kicker">03 // Projects</span>
    <h2 className="section-title">
      Things I&apos;ve launched
    </h2>
    <p className="section-lede">
      Side projects that escaped the lab: a social beer-tracking app live on the
      App Store, and a two-player chess game with every rule enforced.
    </p>
    <div className="projects-grid">
      <MobileApp />
      <ChessApp />
    </div>
  </section>
);

const App = () => {
  return (
    <>
      <ScrollToTop />
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
              <Projects />
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
    </>
  );
};

export default App;
