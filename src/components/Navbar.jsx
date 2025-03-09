import { AppBar, Toolbar, Typography, InputBase, IconButton, Select, MenuItem, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";

const Navbar = () => {
    const [language, setLanguage] = useState("en");

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#121212", padding: "10px" }}>
            <Toolbar>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f5c518", marginRight: "20px" }}>
                    IMDb
                </Typography>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <InputBase
                    placeholder="Search"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        marginLeft: "20px",
                        flexGrow: 1,
                    }}
                />
                <IconButton color="inherit">
                    <SearchIcon />
                </IconButton>
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
                <Button variant="contained" color="warning" sx={{ marginLeft: "20px" }}>Sign In</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;