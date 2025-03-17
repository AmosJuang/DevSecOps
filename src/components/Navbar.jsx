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

    const handleSignInClick = () => {
        navigate("/signin");
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "#121212", padding: "10px" }}>
            <Toolbar>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#61dafb", marginRight: "20px" }}>
                    ReelRate
                </Typography>
                <IconButton color="inherit" sx={{ color: "#61dafb" }}>
                    <MenuIcon />
                </IconButton>
                <InputBase
                    placeholder="Search"
                    sx={{
                        backgroundColor: "#2a2a2a",
                        color: "#ffffff",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        marginLeft: "20px",
                        flexGrow: 1,
                        '&::placeholder': {
                            color: '#888888',
                            opacity: 1,
                        },
                    }}
                />
                <IconButton color="inherit" sx={{ color: "#61dafb" }}>
                    <SearchIcon />
                </IconButton>
                <IconButton color="inherit" sx={{ color: "#61dafb" }}>
                    <BookmarkBorderIcon />
                </IconButton>
                <Select
                    value={language}
                    onChange={handleLanguageChange}
                    sx={{ 
                        marginLeft: "20px",
                        color: "white",
                        backgroundColor: "#2a2a2a",
                        borderRadius: "5px",
                        height: "40px",
                        '& .MuiSelect-icon': {
                            color: '#61dafb'
                        }
                    }}
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
                    sx={{
                        marginLeft: "20px",
                        backgroundColor: "#61dafb",
                        color: "#121212",
                        '&:hover': {
                            backgroundColor: "#4fa8d1"
                        }
                    }}
                    onClick={handleSignInClick}
                >
                    Sign In
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;