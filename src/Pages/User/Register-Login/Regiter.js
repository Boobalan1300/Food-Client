

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from './utils/auth'; 
import './style2.css'; 

function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirm: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (!form.email.trim() || !form.password.trim()) {
            setMessage("Email and password are required");
            setLoading(false);
            return;
        }
        if (!form.email.trim()) {
            setMessage("Email is required");
            setLoading(false);
            return;
        }
        if (!form.password.trim()) {
            setMessage("Password is required");
            setLoading(false);
            return;
        }

        
        const validEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!validEmailRegex.test(form.email)) {
            setMessage("Invalid email format");
            setLoading(false);
            return;
        }

        const validPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!validPasswordRegex.test(form.password)) {
            setMessage("Password should be at least 6 characters, contain 1 symbol, and 1 number");
            setLoading(false);
            return;
        }

       
        if (form.password !== form.confirm) {
            setMessage("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const data = await signUp(form.email, form.password);

            if (data.exist) {
                setMessage("User already exists");
            } else if (data.token) {
                setMessage("Registration successful! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || "Server Error");
        }
        finally {
            setLoading(false); 
        }
    };

    return (
        <div className="background-image-2 custom-width-sm">
            <div className="register-container">
                <form className="register-form">
                    <h2 className="text-center">Register</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            value={form.email} 
                            className="form-control" 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={form.password} 
                            className="form-control" 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirm" 
                            name="confirm" 
                            value={form.confirm} 
                            className="form-control" 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="text-center mt-1">
                    <button
                            className="btn btn-primary my-2"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Submit"} 
                        </button>
                    </div>
                    {message && <p className="text-center text-white">{message}</p>}
                    <div className="text-center my-3">
                        <Link to="/login" className="text-decoration-none text-white">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
