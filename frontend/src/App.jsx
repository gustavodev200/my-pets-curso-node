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
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";

// Pages
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";
import MyPets from "./components/pages/Pet/MyPets";

//Context
import { UserProvider } from "./context/UserContext";
import AddPet from "./components/pages/Pet/AddPet";
import EditPet from "./components/pages/Pet/EditPet";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPet />} />
            <Route path="/pet/edit/:id" element={<EditPet />} />
            {/* <Route path="/users" element={<Users />} /> */}
            {/* <Route path="/allusers" element={<Navigate to="/users" />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
