

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./utils/auth";
import "./style2.css";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.email.trim() && !form.password.trim()) {
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

    try {
      const data = await login(form.email, form.password);

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        navigate("/");
      } else {
        setMessage("Invalid credentials");
      }
    } catch {
      setMessage("Please try again.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="background-image custom-width-sm">
        <div className="login-container">
          <form className="login-form">
            <h2 className="text-center">Login</h2>
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
            <div className="text-center mt-1">
              <button
                className="btn btn-primary my-2"
                onClick={handleSubmit}
                disabled={loading} 
              >
                {loading ? "Processing..." : "Submit"}{" "}
             
              </button>
            </div>
            {message && <p className="text-center text-muted">{message}</p>}
            <div className=" text-center my-3">
              <Link to="/signup" className="text-decoration-none text-white">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
