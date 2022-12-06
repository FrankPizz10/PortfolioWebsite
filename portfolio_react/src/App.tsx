import React from "react";

import { About, Header } from "./container/";
import { Navbar } from "./components/";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
    </div>
  );
};

export default App;