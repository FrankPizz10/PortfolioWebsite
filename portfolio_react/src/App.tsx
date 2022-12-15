import React from "react";

import { Skills, Header, About } from "./container/";
import { Navbar } from "./components/";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Skills />
    </div>
  );
};

export default App;