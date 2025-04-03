import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Email harus diisi');
            return;
        }
        // Here you would typically make an API call to your backend
        setMessage('Link reset password telah dikirim ke email Anda');
        setError('');
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError('');
        setMessage('');
    };

    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            padding: "20px"
        },
        formContainer: {
            width: "350px",
            backgroundColor: "#fff",
            borderRadius: "4px",
            padding: "20px"
        },
        logoContainer: {
            textAlign: "center",
            marginBottom: "20px"
        },
        formWrapper: {
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "20px"
        },
        title: {
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#111",
            textAlign: "center"
        },
        subtitle: {
            fontSize: "14px",
            color: "#555",
            marginBottom: "20px",
            textAlign: "center"
        },
        formGroup: {
            marginBottom: "16px"
        },
        label: {
            display: "block",
            fontSize: "13px",
            fontWeight: "bold",
            color: "#111",
            marginBottom: "4px"
        },
        input: {
            width: "100%",
            padding: "8px",
            fontSize: "13px",
            lineHeight: "normal",
            border: "1px solid #a6a6a6",
            borderRadius: "3px",
            boxShadow: "0 1px 0 rgba(255,255,255,.5), 0 1px 0 rgba(0,0,0,.07) inset",
            outline: "none"
        },
        button: {
            width: "100%",
            backgroundColor: "#E50914",
            borderColor: "#8B0000 #B22222 #900C3F",
            color: "#111",
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: "3px",
            padding: "8px 10px",
            cursor: "pointer",
            fontSize: "13px",
            boxShadow: "0 1px 0 rgba(255,255,255,.4) inset",
            marginTop: "10px"
        },
        message: {
            color: "green",
            marginTop: "10px",
            fontSize: "13px",
            textAlign: "center"
        },
        error: {
            color: "#c40000",
            marginTop: "10px",
            fontSize: "13px",
            textAlign: "center"
        },
        backLink: {
            color: "#0066c0",
            textDecoration: "none",
            fontSize: "13px",
            marginTop: "15px",
            display: "block",
            textAlign: "center"
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <div style={styles.logoContainer}>
                    <img 
                        src="./src/assets/Movie Review Logo.png" 
                        alt="Logo" 
                        style={{ width: "150px", height: "150px" }} 
                    />
                </div>
                <div style={styles.formWrapper}>
                    <h1 style={styles.title}>Reset Password</h1>
                    <p style={styles.subtitle}>
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                style={styles.input}
                                placeholder="Enter your email"
                            />
                        </div>
                        <button type="submit" style={styles.button}>
                            Reset Password
                        </button>
                        {message && <p style={styles.message}>{message}</p>}
                        {error && <p style={styles.error}>{error}</p>}
                    </form>
                    <Link to="/signin" style={styles.backLink}>
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;