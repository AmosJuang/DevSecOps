import { useState, useEffect } from "react";

const images = [
    { id: 1, src: "./src/assets/a.jpg", title: "Death of a Unicorn", description: "Watch the thrilling new trailer now!", related: "./src/assets/1.jpg" },
    { id: 2, src: "./src/assets/b.jpg", title: "Movie 2", description: "An adventure you don't want to miss.", related: "./src/assets/1.jpg" },
    { id: 3, src: "./src/assets/a.jpg", title: "Movie 3", description: "A cinematic experience like no other.", related: "./src/assets/1.jpg" },
    { id: 4, src: "./src/assets/b.jpg", title: "Movie 4", description: "A cinematic experience like no other.", related: "./src/assets/1.jpg" },
    { id: 5, src: "./src/assets/a.jpg", title: "Movie 5", description: "A cinematic experience like no other.", related: "./src/assets/1.jpg" },
    { id: 6, src: "./src/assets/a.jpg", title: "Movie 6", description: "A cinematic experience like no other.", related: "./src/assets/1.jpg" },
];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [autoplay, setAutoplay] = useState(true);

    // Auto-rotation for carousel
    useEffect(() => {
        if (!autoplay) return;

        const interval = setInterval(() => {
            if (currentIndex < images.length - 1) {
                handleImageChange(currentIndex + 1);
            } else {
                handleImageChange(0);
            }
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [currentIndex, autoplay]);

    // Handle mouse enter/leave for autoplay pause
    const handleMouseEnter = () => setAutoplay(false);
    const handleMouseLeave = () => setAutoplay(true);

    const handleImageChange = (index) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsTransitioning(false);
        }, 300);
    };

    const nextImage = () => {
        if (currentIndex < images.length - 1) {
            handleImageChange(currentIndex + 1);
        } else {
            handleImageChange(0); // Loop back to the first image
        }
    };

    const prevImage = () => {
        if (currentIndex > 0) {
            handleImageChange(currentIndex - 1);
        } else {
            handleImageChange(images.length - 1); // Loop to the last image
        }
    };

    // Progress indicators
    const renderProgressDots = () => {
        return (
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "15px" }}>
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleImageChange(index)}
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: index === currentIndex ? "#61dafb" : "rgba(255,255,255,0.5)",
                            border: "none",
                            cursor: "pointer",
                            transition: "background 0.3s, transform 0.2s",
                            transform: index === currentIndex ? "scale(1.2)" : "scale(1)"
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        );
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#121212",
                color: "white",
                padding: "20px",
                borderRadius: "12px",
                maxWidth: "1200px",
                margin: "0 auto",
                position: "relative"
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                flexWrap: "wrap",
                height: "auto",
                minHeight: "500px"
            }}>
                <div style={{
                    flex: "2 1 400px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <img
                        src={images[currentIndex].src}
                        alt={images[currentIndex].title}
                        style={{
                            width: "100%",
                            maxHeight: "500px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            boxShadow: "0px 4px 15px rgba(97,218,251,0.3)",
                            opacity: isTransitioning ? 0.4 : 1,
                            transition: "opacity 0.3s ease-in-out"
                        }}
                    />
                    <button
                        onClick={prevImage}
                        style={{
                            position: "absolute",
                            left: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(18,18,18,0.6)",
                            border: "none",
                            padding: "12px",
                            cursor: "pointer",
                            fontSize: "28px",
                            color: "#61dafb",
                            borderRadius: "50%",
                            transition: "background 0.3s, transform 0.2s",
                            opacity: 0.7,
                            zIndex: 2,
                            ":hover": { opacity: 1, transform: "translateY(-50%) scale(1.1)" }
                        }}
                        aria-label="Previous slide"
                        onMouseOver={(e) => e.currentTarget.style.opacity = "1"}
                        onMouseOut={(e) => e.currentTarget.style.opacity = "0.7"}
                    >
                        ◄
                    </button>
                    <button
                        onClick={nextImage}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(18,18,18,0.6)",
                            border: "none",
                            padding: "12px",
                            cursor: "pointer",
                            fontSize: "28px",
                            color: "#61dafb",
                            borderRadius: "50%",
                            transition: "background 0.3s, transform 0.2s",
                            opacity: 0.7,
                            zIndex: 2
                        }}
                        aria-label="Next slide"
                        onMouseOver={(e) => e.currentTarget.style.opacity = "1"}
                        onMouseOut={(e) => e.currentTarget.style.opacity = "0.7"}
                    >
                        ►
                    </button>

                    <div style={{
                        position: "absolute",
                        bottom: "15px",
                        left: "0",
                        right: "0"
                    }}>
                        {renderProgressDots()}
                    </div>
                </div>

                <div style={{
                    flex: "1 1 300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "10px"
                }}>
                    <div style={{
                        opacity: isTransitioning ? 0.5 : 1,
                        transition: "opacity 0.3s ease-in-out"
                    }}>
                        <h2 style={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                            color: "#ffffff"
                        }}>
                            {images[currentIndex].title}
                        </h2>
                        <p style={{
                            fontSize: "18px",
                            marginBottom: "20px",
                            opacity: "0.8"
                        }}>
                            {images[currentIndex].description}
                        </p>
                        <button style={{
                            background: "#61dafb",
                            color: "#121212",
                            fontSize: "16px",
                            padding: "12px 24px",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            transition: "background 0.3s, transform 0.2s",
                            marginBottom: "20px"
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.background = "#4fa8d1";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.background = "#61dafb";
                            }}
                        >
                            Watch Now ▶
                        </button>
                    </div>

                    <div style={{
                        marginTop: "10px",
                        transition: "opacity 0.5s ease-in-out",
                        maxHeight: "300px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        paddingRight: "10px",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#61dafb #2a2a2a"
                    }}>
                        {images.map((image, index) => (
                            <div
                                key={image.id}
                                onClick={() => handleImageChange(index)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "8px",
                                    borderRadius: "8px",
                                    background: index === currentIndex ? "rgba(97,218,251,0.9)" : "rgba(42,42,42,0.8)",
                                    marginBottom: "8px",
                                    transition: "all 0.3s",
                                    cursor: "pointer",
                                    transform: index === currentIndex ? "translateX(5px)" : "translateX(0)"
                                }}
                                onMouseOver={(e) => {
                                    if (index !== currentIndex) {
                                        e.currentTarget.style.background = "rgba(97,218,251,0.3)";
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (index !== currentIndex) {
                                        e.currentTarget.style.background = "rgba(42,42,42,0.8)";
                                    }
                                }}
                            >
                                <img
                                    src={image.related}
                                    alt={`Thumbnail of ${image.title}`}
                                    style={{
                                        width: "80px",
                                        height: "60px",
                                        borderRadius: "8px",
                                        opacity: index === currentIndex ? "1" : "0.7",
                                        transition: "opacity 0.3s, transform 0.3s",
                                        objectFit: "cover"
                                    }}
                                />
                                <span style={{
                                    color: index === currentIndex ? "#121212" : "white",
                                    fontWeight: index === currentIndex ? "bold" : "normal",
                                    fontSize: "14px"
                                }}>
                                    {image.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {autoplay && (
                <div style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "20px",
                    background: "rgba(18,18,18,0.7)",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    color: "#61dafb"
                }}>
                    Auto-playing • Hover to pause
                </div>
            )}
        </div>
    );
};

export default HeroSection;