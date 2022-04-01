import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from './components/layout/Container'

// Pages
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/users" element={<Users />} /> */}
          {/* <Route path="/allusers" element={<Navigate to="/users" />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
