import { useRef } from "react";
import "./Featured.css";

const Featured = () => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -1200, behavior: "smooth" }); // Scroll two items at once
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 1200, behavior: "smooth" }); // Scroll two items at once
        }
    };

    // Sample celebrity data
    const celebrities = [
        { name: "Tom Cruise", image: "./src/assets/F1.jpg" },
        { name: "Scarlett Johansson", image: "./src/assets/F2.jpg" },
        { name: "Robert Downey Jr.", image: "./src/assets/F3jpg.jpg" },
        { name: "Zendaya", image: "./src/assets/f4.jpg" },
        { name: "Chris Hemsworth", image: "./src/assets/f5.jpg" },
        { name: "Jennifer Lawrence", image: "./src/assets/f6.jpg" },
    ];

    return (
        <>
            <div className="featured-container">
                <h3 className="featured-title">Featured today</h3>
                <div className="featured-wrapper">
                    <button onClick={scrollLeft} className="featured-button left">&#10094;</button>
                    <div ref={scrollRef} className="featured-scroll">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="featured-item">
                                <img
                                    src="../src/assets/a.jpg"
                                    alt="Movie"
                                    className="featured-img"
                                />
                                <p className="featured-text">TV Tracker: Renewed and Canceled Shows</p>
                                <a href="#" className="featured-link">Check the status</a>
                            </div>
                        ))}
                    </div>
                    <button onClick={scrollRight} className="featured-button right">&#10095;</button>
                </div>
            </div>

            <div className="celebrity-container">
                <h3 className="featured-title">Most Popular Celebrities</h3>
                <div className="celebrity-grid">
                    {celebrities.map((celeb, index) => (
                        <div key={index} className="celebrity-item">
                            <img
                                src={celeb.image}
                                alt={celeb.name}
                                className="celebrity-img"
                            />
                            <p className="celebrity-name">{celeb.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Featured;