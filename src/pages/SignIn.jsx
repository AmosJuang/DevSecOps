import { Box, Typography, TextField, Button, Paper } from "@mui/material";

const SignIn = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "50px" }}>
            <Paper elevation={3} sx={{ padding: "30px", maxWidth: "400px", width: "100%" }}>
                <Typography variant="h4" sx={{ marginBottom: "20px", textAlign: "center" }}>
                    Sign In
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    sx={{ marginTop: "20px", backgroundColor: "#61dafb", '&:hover': { backgroundColor: "#4fc3dc" } }}
                    fullWidth
                >
                    Sign In
                </Button>
            </Paper>
        </Box>
    );
};

export default SignIn;
