import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Alert from "./components/layout/Alert";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import setAuthHeader from "./utils/setHeader";
import "./App.css";

import ContactState from "./contexts/contacts/ContactState";
import AuthState from "./contexts/auth/AuthState";
import AlertState from "./contexts/alert/AlertState";

const App = () => {
  if (localStorage.token) {
    setAuthHeader(localStorage.token);
  }
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Navbar />
            <div className='container'>
              <Alert />
              <Routes>
                <Route exact path='/' element={<ProtectedRoute />}>
                  <Route exact path='/' element={<Home />} />
                </Route>
                <Route exact path='/about' element={<About />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
              </Routes>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
