const HeroSection = () => {
    return (
        <div style={{ position: "relative", width: "100%", height: "400px", backgroundColor: "#000" }}>
            <img
                src="./src/assets/a.jpg"
                alt="Featured Movie"
                style={{ width: "100%", height: "100%", objectFit: "scale-down" }}
            />
            <div style={{ position: "absolute", bottom: "50px", left: "50px", color: "white" }}>
                <h2>'Death of a Unicorn'</h2>
                <p>Watch the Trailer</p>
            </div>
        </div>
    );
};

export default HeroSection;