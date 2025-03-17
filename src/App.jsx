import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Home from "./pages/Home";
import SearchResults from './components/SearchResults';
import ForgetPassword from './components/ForgetPassword';
import MovieDetails from './components/MovieDetails';
import Profile from './components/Profile';

function AppContent() {
    const location = useLocation();
    const showNavbar = !["/signin", "/register", "/forget-password"].includes(location.pathname);

    return (
        <div className="app-container" style={{ backgroundColor: '#141414', minHeight: '100vh' }}>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;