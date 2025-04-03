import React, { useEffect } from "react";

const Bookmark = ({ bookmarkedMovies = [] }) => {
    useEffect(() => {
        // Remove old styles if they exist
        const existingStyle = document.getElementById("bookmark-styles");
        if (existingStyle) {
            existingStyle.remove();
        }

        const styles = `
      .bookmark-wrapper {
        padding: 24px;
        background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
      }
      
      .bookmark-wrapper:hover {
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4); 
      }
      
      .bookmark-title {
        font-size: 28px;
        margin-bottom: 24px;
        text-align: center;
        position: relative;
        padding-bottom: 12px;
        font-weight: 700;
        color: #e9e9e9;
      }
      
      .bookmark-title:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: linear-gradient(90deg, #ff6b6b, #ffa502);
        border-radius: 2px;
      }
      
      .empty-message {
        font-size: 18px;
        color: #aaa;
        text-align: center;
        padding: 40px 0;
        animation: fadeIn 1s ease-in-out;
      }
      
      .bookmark-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 24px;
        animation: fadeIn 0.5s ease-in-out;
      }
      
      .bookmark-item {
        background-color: #292929;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        transform: translateY(0);
        position: relative;
      }
      
      .bookmark-item:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
      }
      
      .image-container {
        width: 100%;
        height: 300px;
        overflow: hidden;
        position: relative;
      }
      
      .bookmark-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.5s ease;
      }
      
      .bookmark-item:hover .bookmark-image {
        transform: scale(1.1);
      }
      
      .item-details {
        padding: 16px;
        position: relative;
      }
      
      .bookmark-name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
        color: #e9e9e9;
      }
      
      .rating {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: 16px;
      }
      
      .rating i {
        color: gold;
        transition: all 0.3s ease;
      }
      
      .bookmark-item:hover .rating i {
        transform: rotate(360deg);
      }
      
      .delete-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: rgba(255, 0, 0, 0.7);
        color: white;
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      .bookmark-item:hover .delete-button {
        opacity: 1;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Loading animation for when items are being fetched */
      .loading {
        display: flex;
        justify-content: center;
        padding: 40px 0;
      }
      
      .loading-dot {
        width: 12px;
        height: 12px;
        margin: 0 6px;
        border-radius: 50%;
        background-color: #ff6b6b;
        animation: bounce 1.4s infinite ease-in-out both;
      }
      
      .loading-dot:nth-child(1) { animation-delay: -0.32s; }
      .loading-dot:nth-child(2) { animation-delay: -0.16s; }
      
      @keyframes bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1.0); }
      }
    `;

        const styleSheet = document.createElement("style");
        styleSheet.id = "bookmark-styles"; // Add ID to avoid duplicates
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        return () => {
            styleSheet.remove(); // Remove style when component unmounts
        };
    }, []);

    return (
        <div className="bookmark-wrapper">
            <h2 className="bookmark-title">Bookmarked Movies</h2>

            {bookmarkedMovies.length === 0 ? (
                <div className="empty-message">
                    No movies bookmarked yet. Start exploring and save your favorites!
                </div>
            ) : (
                <div className="bookmark-container">
                    {bookmarkedMovies.map((movie, index) => (
                        <div
                            className="bookmark-item"
                            key={index}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                animation: 'fadeIn 0.5s ease-in-out forwards'
                            }}
                        >
                            <div className="image-container">
                                <img
                                    src={movie.image || 'https://via.placeholder.com/200x300'}
                                    alt={movie.name}
                                    className="bookmark-image"
                                />
                                <button className="delete-button">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                            <div className="item-details">
                                <h3 className="bookmark-name">{movie.name}</h3>
                                <div className="rating">
                                    <i className="fas fa-star"></i>
                                    <span>{movie.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookmark;