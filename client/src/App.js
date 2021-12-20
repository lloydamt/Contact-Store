import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";

import ContactState from "./contexts/contacts/ContactState";

function App() {
  return (
    <ContactState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
      </Router>
    </ContactState>
  );
}

export default App;
