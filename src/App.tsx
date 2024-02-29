import React from "react";
import { Route, Routes } from "react-router-dom";

import { Skills, Header, About, Resume, MobileApp, ChessApp, Contact } from "./container/";
import { Navbar } from "./components/";

import "./App.scss";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
          <div className="app">
            <Navbar />
            <Header />
            <About />
            <Skills />
            <MobileApp />
            <ChessApp />
            <Contact />
          </div>} />
      <Route path="/resume" element={
        <div className="app">
          <Navbar />
          <Resume />
        </div>} />
    </Routes>  
  );
};

export default App;