import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

function AppContent() {
  const navigate = useNavigate();

  const handleNavClick = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate('/')}>IMDb</div>
          <div className="search-bar">
            <select className="search-select">
              <option>All</option>
              <option>Movies</option>
              <option>TV Shows</option>
              <option>Celebs</option>
            </select>
            <input type="text" placeholder="Search IMDb" />
            <button><i className="fas fa-search"></i></button>
          </div>
          <nav className="main-nav">
            <Link to="/movies" onClick={handleNavClick('/movies')}>
              <i className="fas fa-film"></i> Movies
            </Link>
            <Link to="/tv-shows" onClick={handleNavClick('/tv-shows')}>
              <i className="fas fa-tv"></i> TV Shows
            </Link>
            <Link to="/top-rated" onClick={handleNavClick('/top-rated')}>
              <i className="fas fa-star"></i> Top Rated
            </Link>
            <Link to="/awards" onClick={handleNavClick('/awards')}>
              <i className="fas fa-award"></i> Awards & Events
            </Link>
          </nav>
          <div className="sign-in">
            <button className="btn-sign-in" onClick={handleNavClick('/signin')}>
              <i className="fas fa-user"></i> Sign In
            </button>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

// Placeholder components
const Home = () => (
  <main className="main-content">
    <section className="featured-section">
      <h2>Featured Today</h2>
      <div className="movie-grid">
        {/* Movie cards will go here */}
      </div>
    </section>
    
    <section className="trending-section">
      <h2>Trending</h2>
      <div className="movie-grid">
        {/* Trending movies will go here */}
      </div>
    </section>
  </main>
);

const Movies = () => <div>Movies Page</div>;
const TVShows = () => <div>TV Shows Page</div>;
const TopRated = () => <div>Top Rated Page</div>;
const Awards = () => <div>Awards & Events Page</div>;
const SignIn = () => <div>Sign In Page</div>;

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
