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
    //Validasi form ? gimana mastiin dia masukin format email? 
    const validateForm = () => { 
        let tempErrors = {};
        
        if (!formData.username) {
            tempErrors.username = 'Username harus ada';
        }
        if (!formData.email) {
            tempErrors.email = 'Email harus ada';
        }
        if (!formData.password) {
            tempErrors.password = 'Password harus ada ';
        } else if (formData.password.length < 8) {
            tempErrors.password = 'Password harus minimal 8 karakter';
        }

        
        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = 'Passwords tidak cocok ';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
            // Tambahin logic setelah Registrasi gimana?
            navigate('/signin'); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#121212" }}>
            <div className="max-w-md w-full p-6 rounded-lg shadow-lg" style={{ backgroundColor: "#1a1a1a", border: "1px solid #f5c518" }}>
                <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "#f5c518" }}>Register</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username field */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" style={{ color: "#f5c518" }}>
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg focus:outline-none"
                            style={{ 
                                backgroundColor: "#333",
                                color: "white",
                                border: errors.username ? "1px solid #ff0000" : "1px solid #666"
                            }}
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>

                    {/* Email field */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" style={{ color: "#f5c518" }}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg focus:outline-none"
                            style={{ 
                                backgroundColor: "#333",
                                color: "white",
                                border: errors.email ? "1px solid #ff0000" : "1px solid #666"
                            }}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                   
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" style={{ color: "#f5c518" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg focus:outline-none"
                            style={{ 
                                backgroundColor: "#333",
                                color: "white",
                                border: errors.password ? "1px solid #ff0000" : "1px solid #666"
                            }}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password field */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" style={{ color: "#f5c518" }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg focus:outline-none"
                            style={{ 
                                backgroundColor: "#333",
                                color: "white",
                                border: errors.confirmPassword ? "1px solid #ff0000" : "1px solid #666"
                            }}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-lg focus:outline-none transition-colors"
                        style={{ 
                            backgroundColor: "#f5c518",
                            color: "#121212",
                            border: "1px solid #f5c518"
                        }}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
