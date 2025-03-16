import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Home from "./pages/Home";
import ForgetPassword from './components/ForgetPassword';

function AppContent() {
  const location = useLocation();
  const showNavbar = !["/signin", "/register", "/forget-password"].includes(location.pathname);

  return (
    <div className="app-container">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
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