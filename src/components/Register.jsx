import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '', 
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let tempErrors = {};
        
        if (!formData.username) {
            tempErrors.username = 'Username harus ada';
        }
        if (!formData.email) {
            tempErrors.email = 'Email harus ada';
        }
        if (!formData.password) {
            tempErrors.password = 'Password harus ada';
        } else if (formData.password.length < 8) {
            tempErrors.password = 'Password harus minimal 8 karakter';
        }
        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = 'Passwords tidak cocok';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
            navigate('/signin');
        }
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
        logo: {
            height: "32px",
            marginBottom: "16px"
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
            color: "#111"
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
            padding: "3px 7px",
            fontSize: "13px",
            lineHeight: "normal",
            border: "1px solid #a6a6a6",
            borderRadius: "3px",
            boxShadow: "0 1px 0 rgba(255,255,255,.5), 0 1px 0 rgba(0,0,0,.07) inset",
            outline: "none"
        },
        inputError: {
            border: "1px solid #c40000"
        },
        errorText: {
            color: "#c40000",
            fontSize: "12px",
            marginTop: "4px"
        },
        button: {
            width: "100%",
            backgroundColor: "#f0c14b",
            borderColor: "#a88734 #9c7e31 #846a29",
            color: "#111",
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: "3px",
            padding: "8px 10px",
            cursor: "pointer",
            fontSize: "13px",
            boxShadow: "0 1px 0 rgba(255,255,255,.4) inset"
        },
        divider: {
            borderTop: "1px solid #ddd",
            marginTop: "20px",
            paddingTop: "20px"
        },
        link: {
            color: "#0066c0",
            textDecoration: "none",
            fontSize: "13px"
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
                    <h1 style={styles.title}>Register Akun</h1>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Your name</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(errors.username && styles.inputError)
                                }}
                            />
                            {errors.username && <p style={styles.errorText}>{errors.username}</p>}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(errors.email && styles.inputError)
                                }}
                            />
                            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="At least 8 characters"
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(errors.password && styles.inputError)
                                }}
                            />
                            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Re-enter password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(errors.confirmPassword && styles.inputError)
                                }}
                            />
                            {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
                        </div>

                        <button type="submit" style={styles.button}>
                            Create your IMDb account
                        </button>
                    </form>

                    <div style={styles.divider}>
                        <p style={{ fontSize: "13px", color: "#111" }}>
                            Already have an account?{' '}
                            <a href="/signin" style={styles.link}>Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
