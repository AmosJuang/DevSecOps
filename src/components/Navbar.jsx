import { AppBar, Toolbar, Typography, InputBase, IconButton, Select, MenuItem, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [language, setLanguage] = useState("en");
    const navigate = useNavigate();

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#121212", padding: "10px" }}>
            <Toolbar>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: "bold", 
                        color: "#f5c518", 
                        marginRight: "20px",
                        cursor: "pointer" 
                    }}
                    onClick={() => navigate("/")}
                >
                    IMDb
                </Typography>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <div style={{ position: 'relative', flexGrow: 1, marginLeft: "20px" }}>
                    <InputBase
                        placeholder="Search IMDb"
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            width: "100%"
                        }}
                    />
                    <IconButton 
                        sx={{ 
                            position: 'absolute', 
                            right: 2, 
                            top: '50%', 
                            transform: 'translateY(-50%)'
                        }}
                    >
                        <SearchIcon sx={{ color: 'black' }} />
                    </IconButton>
                </div>
                <IconButton color="inherit">
                    <BookmarkBorderIcon />
                </IconButton>
                <Select
                    value={language}
                    onChange={handleLanguageChange}
                    sx={{ marginLeft: "20px", color: "white", backgroundColor: "#333", borderRadius: "5px", height: "40px" }}
                >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                    <MenuItem value="de">Deutsch</MenuItem>
                    <MenuItem value="zh">中文</MenuItem>
                    <MenuItem value="ja">日本語</MenuItem>
                    <MenuItem value="ko">한국어</MenuItem>
                    <MenuItem value="ru">Русский</MenuItem>
                    <MenuItem value="hi">हिन्दी</MenuItem>
                </Select>
                <Button 
                    variant="contained" 
                    color="warning" 
                    sx={{ marginLeft: "20px" }}
                    onClick={() => navigate("/signin")}
                >
                    Sign In
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;