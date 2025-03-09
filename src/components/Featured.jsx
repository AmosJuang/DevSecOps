import { useRef } from "react";
import "./Featured.css";

const Featured = () => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -400, behavior: "smooth" }); // Geser dua box
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 400, behavior: "smooth" }); // Geser dua box
        }
    };

    return (
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
    );
};

export default Featured;