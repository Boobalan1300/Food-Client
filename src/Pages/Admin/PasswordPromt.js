
import React, { useState } from 'react';
import './admin.css';
import NavBar from '../../Common/navbar';

const storedHashedPassword = process.env.REACT_APP_PASSWORD;

const PasswordPrompt = ({ onUnlock }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === storedHashedPassword) {
            onUnlock();
        } else {
            setError('Incorrect password');
        }
    };

    return (
        <>
            <NavBar />
            <div className="container-fluid bg-admin adminImg">
                <form 
                    className="bg-light shadow p-5 admin-form" 
                    style={{ minHeight: "200px", width: "100%", maxWidth: "400px" }} 
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-center">Enter Password</h2>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    {error && <p className="text-center text-danger mt-2">{error}</p>}
                </form>
            </div>
        </>
    );
};

export default PasswordPrompt;
