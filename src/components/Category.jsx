import React, { useState } from "react";
import "./Category.css";

const Category = () => {
    const [bookmarked, setBookmarked] = useState({});

    const toggleBookmark = (categoryIndex, itemIndex) => {
        const key = `${categoryIndex}-${itemIndex}`;
        setBookmarked(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const categories = [
        {
            title: "Top 10 on IMDb this week",
            items: [
                { name: "The White Lotus", image: "./src/assets/1.jpg", rating: 8.5 },
                { name: "Zero Day", image: "./src/assets/2.jpg", rating: 7.9 },
                { name: "Severance", image: "./src/assets/3.jpg", rating: 9.1 },
                { name: "Reacher", image: "./src/assets/1.jpg", rating: 8.3 },
                { name: "Panic", image: "./src/assets/1.jpg", rating: 7.7 },
                { name: "Reacher", image: "./src/assets/1.jpg", rating: 8.3 },
                { name: "The White Lotus", image: "./src/assets/1.jpg", rating: 8.5 },
                { name: "Zero Day", image: "./src/assets/1.jpg", rating: 7.9 },
                { name: "Severance", image: "./src/assets/1.jpg", rating: 9.1 },
                { name: "Panic", image: "./src/assets/1.jpg", rating: 7.7 },
            ],
        },
        {
            title: "Fan favorites",
            items: [
                { name: "Amélie", image: "./src/assets/1.jpg", rating: 8.9 },
                { name: "The Brutalist", image: "./src/assets/1.jpg", rating: 7.5 },
                { name: "Daredevil: Born Again", image: "./src/assets/1.jpg", rating: 8.7 },
                { name: "Companion", image: "./src/assets/1.jpg", rating: 7.8 },
                { name: "Reacher", image: "./src/assets/1.jpg", rating: 8.3 },
                { name: "The White Lotus", image: "./src/assets/1.jpg", rating: 8.5 },
                { name: "Zero Day", image: "./src/assets/1.jpg", rating: 7.9 },
                { name: "Severance", image: "./src/assets/1.jpg", rating: 9.1 },
                { name: "Panic", image: "./src/assets/1.jpg", rating: 7.7 },
                { name: "Reacher", image: "./src/assets/1.jpg", rating: 8.3 },
            ],
        },
        {
            title: "Popular interests",
            items: [
                { name: "Superhero", image: "./src/assets/1.jpg", rating: 8.2 },
                { name: "Coming-of-age", image: "./src/assets/1.jpg", rating: 7.6 },
                { name: "Slasher Horror", image: "./src/assets/1.jpg", rating: 7.3 },
                { name: "Reacher", image: "./src/assets/1.jpg", rating: 8.3 },
                { name: "The White Lotus", image: "./src/assets/1.jpg", rating: 8.5 },
                { name: "Zero Day", image: "./src/assets/1.jpg", rating: 7.9 },
                { name: "Severance", image: "./src/assets/1.jpg", rating: 9.1 },
                { name: "Panic", image: "./src/assets/1.jpg", rating: 7.7 },
                { name: "Reacher", image: "./src/assets/1.jpg", rating: 8.3 },
                { name: "The White Lotus", image: "./src/assets/1.jpg", rating: 8.5 },
            ],
        },
    ];

    return (
        <div className="category-wrapper">
            {categories.map((category, categoryIndex) => (
                <section key={categoryIndex} className="category-section">
                    <h2 className="category-title">{category.title}</h2>
                    <div className="category-container">
                        {category.items.map((item, itemIndex) => {
                            const bookmarkKey = `${categoryIndex}-${itemIndex}`;
                            const isBookmarked = bookmarked[bookmarkKey];

                            return (
                                <div key={itemIndex} className="category-item">
                                    <div className="image-container">
                                        <img src={item.image} alt={item.name} className="category-image" />
                                        <button
                                            className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
                                            onClick={() => toggleBookmark(categoryIndex, itemIndex)}
                                            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
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

                                            <button className="watchlist-button">
                                                <i className="fa fa-plus"></i> Watchlist
                                            </button>
                                        </div>

                                        <button className="trailer-button">
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