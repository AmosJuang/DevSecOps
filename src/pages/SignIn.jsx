import { Box, Container, Typography, TextField, Button, Paper, textFieldClasses } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#121212",
                        border: "1px solid #E50914",
                        width : "100%",
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ color: "#E50914", marginBottom: 3 }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width : "100%" }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address or Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: "#333",
                                input: { color: "white" },
                                "& label": { color: "gray" },
                                "& label.Mui-focused": { color: "#f5c518" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "gray" },
                                    "&:hover fieldset": { borderColor: "#f5c518" },
                                    "&.Mui-focused fieldset": { borderColor: "#f5c518" },
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: "#333",
                                input: { color: "white" },
                                "& label": { color: "gray" },
                                "& label.Mui-focused": { color: "#f5c518" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "gray" },
                                    "&:hover fieldset": { borderColor: "#f5c518" },
                                    "&.Mui-focused fieldset": { borderColor: "#f5c518" },
                                },
                            }}
                        />
                        <Box sx={{ textAlign: 'right', marginBottom: '10px' }}>
                            <Link to="/forget-password" style={{ color: '#E50914', textDecoration: 'none' }}>
                                Forgot your password?
                            </Link>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: "#E50914",
                                color: "black",
                                "&:hover": {
                                    backgroundColor: "#dcb115",
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'white' }}>
                            Belum punya akun ? {' '}
                            <Button
                                onClick={() => navigate('/register')}
                                sx={{
                                    color: '#E50914',
                                    textTransform: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        backgroundColor: 'transparent'
                                    }
                                }}
                            >
                                Register!
                            </Button>
                        </Typography>
                    </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default SignIn;