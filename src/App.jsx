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
import AdminProfile from './components/AdminProfile';
import Dashboard from './pages/Dashboard';
import Bookmark from './components/Bookmark';
import Watchlist from './components/WatchList';
import Trailer from './components/Trailer';
import axios from "axios";

function AppContent() {
    const location = useLocation();
    const showNavbar = !["/signin", "/register", "/forget-password", "/Dashboard"].includes(location.pathname);

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
                <Route path="/adminprofile" element={<AdminProfile />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/bookmark" element={<Bookmark />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/trailer" element={<Trailer />} />
            </Routes>
        </div>
    );
}

function App() {
    // const [message, setMessage] = React.useState("");

    // useEffect(() => {
    //     axios.get("http://localhost:5000/api/hello")
    //         .then((response) => {
    //             setMessage(response.data.message);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, []);
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;