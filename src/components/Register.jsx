import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Pastikan untuk membuat file CSS ini

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
            console.log('Registration successful!');
            navigate('/signin');
        }
    };

    return (
        <div className="register-container">
            <div className="form-container">
                <div className="logo-container">
                    <img 
                        src="./src/assets/Movie Review Logo.png" 
                        alt="Logo" 
                        className="logo-image"
                    />
                </div>
                <div className="form-wrapper">
                    <h1 className="title">Register Akun</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Your name</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`form-input ${errors.username ? 'input-error' : ''}`}
                            />
                            {errors.username && <p className="error-text">{errors.username}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-input ${errors.email ? 'input-error' : ''}`}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="At least 8 characters"
                                onChange={handleChange}
                                className={`form-input ${errors.password ? 'input-error' : ''}`}
                            />
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Re-enter password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                            />
                            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                        </div>

                        <button type="submit" className="submit-button">
                            Create your account
                        </button>
                    </form>

                    <div className="divider">
                        <p className="signin-text">
                            Already have an account?{' '}
                            <a href="/signin" className="signin-link">Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;