import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

const Category = () => {
    const navigate = useNavigate();
    const [bookmarked, setBookmarked] = useState({});
    const [watchlist, setWatchlist] = useState({});

    // Load saved bookmarks and watchlist from localStorage on component mount
    useEffect(() => {
        const savedBookmarks = localStorage.getItem('bookmarks');
        const savedWatchlist = localStorage.getItem('watchlist');
        
        if (savedBookmarks) {
            setBookmarked(JSON.parse(savedBookmarks));
        }
        
        if (savedWatchlist) {
            setWatchlist(JSON.parse(savedWatchlist));
        }
    }, []);

    // Save to localStorage whenever bookmarked or watchlist changes
    useEffect(() => {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarked));
    }, [bookmarked]);

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    // Toggle bookmark status and save the item to bookmarks array
    const toggleBookmark = (categoryIndex, itemIndex, item) => {
        const key = `${categoryIndex}-${itemIndex}`;
        const updatedBookmarked = {
            ...bookmarked,
            [key]: !bookmarked[key]
        };
        
        setBookmarked(updatedBookmarked);
        
        // Get current bookmarks array
        let bookmarksArray = JSON.parse(localStorage.getItem('bookmarksArray') || '[]');
        
        // If item is being bookmarked (not unbookmarked)
        if (!bookmarked[key]) {
            // Add the item with a unique identifier
            bookmarksArray.push({
                ...item,
                id: key,
                dateAdded: new Date().toISOString()
            });
        } else {
            // Remove the item if unbookmarked
            bookmarksArray = bookmarksArray.filter(bookmark => bookmark.id !== key);
        }
        
        // Save the updated array
        localStorage.setItem('bookmarksArray', JSON.stringify(bookmarksArray));
        
        // Show notification
        const action = !bookmarked[key] ? 'Added to' : 'Removed from';
        alert(`${action} bookmarks: ${item.name}`);
    };

    // Add to watchlist and save the item to watchlist array
    const addToWatchlist = (categoryIndex, itemIndex, item) => {
        const key = `${categoryIndex}-${itemIndex}`;
        const updatedWatchlist = {
            ...watchlist,
            [key]: true
        };
        
        setWatchlist(updatedWatchlist);
        
        // Get current watchlist array
        let watchlistArray = JSON.parse(localStorage.getItem('watchlistArray') || '[]');
        
        // Check if item is already in watchlist
        if (!watchlistArray.some(watchItem => watchItem.id === key)) {
            // Add the item with a unique identifier
            watchlistArray.push({
                ...item,
                id: key,
                dateAdded: new Date().toISOString()
            });
            
            // Save the updated array
            localStorage.setItem('watchlistArray', JSON.stringify(watchlistArray));
            
            // Show notification
            alert(`Added to watchlist: ${item.name}`);
        } else {
            alert(`${item.name} is already in your watchlist`);
        }
    };

    // Navigate to bookmarks page
    const goToBookmarks = () => {
        navigate('/bookmark');
    };

    // Navigate to watchlist page
    const goToWatchlist = () => {
        navigate('/watchlist');
    };

    const goToTrailer = () => {
        navigate('/trailer');
    };

    const categories = [
        {
            title: "Top 10 on this week",
            items: [
                { name: "The White Lotus", image: "./src/assets/1.jpg", rating: 8.5 },
                { name: "Zero Day", image: "./src/assets/2.jpg", rating: 7.9 },
                { name: "Severance", image: "./src/assets/3.jpg", rating: 9.1 },
                { name: "Reacher", image: "./src/assets/4.jpg", rating: 8.3 },
                { name: "Panic", image: "./src/assets/5.jpg", rating: 7.7 },
                { name: "Reacher", image: "./src/assets/6.jpg", rating: 8.3 },
                { name: "The White Lotus", image: "./src/assets/7.jpg", rating: 8.5 },
                { name: "Zero Day", image: "./src/assets/8.jpg", rating: 7.9 },
                { name: "Severance", image: "./src/assets/9.jpg", rating: 9.1 },
                { name: "Panic", image: "./src/assets/10.jpg", rating: 7.7 },
            ],
        },
        {
            title: "Fan favorites",
            items: [
                { name: "Amélie", image: "./src/assets/1.jpg", rating: 8.9 },
                { name: "The Brutalist", image: "./src/assets/2.jpg", rating: 7.5 },
                { name: "Daredevil: Born Again", image: "./src/assets/3.jpg", rating: 8.7 },
                { name: "Companion", image: "./src/assets/4.jpg", rating: 7.8 },
                { name: "Reacher", image: "./src/assets/5.jpg", rating: 8.3 },
                { name: "The White Lotus", image: "./src/assets/6.jpg", rating: 8.5 },
                { name: "Zero Day", image: "./src/assets/7.jpg", rating: 7.9 },
                { name: "Severance", image: "./src/assets/8.jpg", rating: 9.1 },
                { name: "Panic", image: "./src/assets/9.jpg", rating: 7.7 },
                { name: "Reacher", image: "./src/assets/10.jpg", rating: 8.3 },
            ],
        },
        {
            title: "Popular interests",
            items: [
                { name: "Superhero", image: "./src/assets/1.jpg", rating: 8.2 },
                { name: "Coming-of-age", image: "./src/assets/2.jpg", rating: 7.6 },
                { name: "Slasher Horror", image: "./src/assets/3.jpg", rating: 7.3 },
                { name: "Reacher", image: "./src/assets/4.jpg", rating: 8.3 },
                { name: "The White Lotus", image: "./src/assets/5.jpg", rating: 8.5 },
                { name: "Zero Day", image: "./src/assets/6.jpg", rating: 7.9 },
                { name: "Severance", image: "./src/assets/7.jpg", rating: 9.1 },
                { name: "Panic", image: "./src/assets/8.jpg", rating: 7.7 },
                { name: "Reacher", image: "./src/assets/9.jpg", rating: 8.3 },
                { name: "The White Lotus", image: "./src/assets/10.jpg", rating: 8.5 },
            ],
        },
    ];

    return (
        <div className="category-wrapper">
            <div className="navigation-buttons">
                <button className="nav-button" onClick={goToBookmarks}>
                    <i className="fa fa-bookmark"></i> My Bookmarks
                </button>
                <button className="nav-button" onClick={goToWatchlist}>
                    <i className="fa fa-list"></i> My Watchlist
                </button>
            </div>

            {categories.map((category, categoryIndex) => (
                <section key={categoryIndex} className="category-section">
                    <h2 className="category-title">{category.title}</h2>
                    <div className="category-container">
                        {category.items.map((item, itemIndex) => {
                            const bookmarkKey = `${categoryIndex}-${itemIndex}`;
                            const isBookmarked = bookmarked[bookmarkKey];
                            const isInWatchlist = watchlist[bookmarkKey];

                            return (
                                <div key={itemIndex} className="category-item">
                                    <div className="image-container">
                                        <img src={item.image} alt={item.name} className="category-image" />
                                        <button
                                            className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
                                            onClick={() => toggleBookmark(categoryIndex, itemIndex, item)}
                                            aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                                        >
                                            <i className={`fa ${isBookmarked ? 'fa-bookmark' : 'fa-bookmark-o'}`}></i>
                                        </button>
                                    </div>

                                    <div className="item-details">
                                        <p className="category-name">{item.name}</p>

                                        <div className="rating-watchlist">
                                            <div className="rating">
                                                <i className="fa fa-star"></i>
                                                <span>{item.rating}</span>
                                            </div>

                                            <button 
                                                className={`watchlist-button ${isInWatchlist ? 'in-watchlist' : ''}`}
                                                onClick={() => addToWatchlist(categoryIndex, itemIndex, item)}
                                            >
                                                <i className={`fa ${isInWatchlist ? 'fa-check' : 'fa-plus'}`}></i>
                                                {isInWatchlist ? 'In Watchlist' : 'Watchlist'}
                                            </button>
                                        </div>

                                        <button className="trailer-button" onClick={goToTrailer}>
                                            <i className="fa fa-play-circle"></i> Play Trailer
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Category;