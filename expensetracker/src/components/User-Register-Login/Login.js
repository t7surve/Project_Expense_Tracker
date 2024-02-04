import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    //Login API
    const result = await axios
      .post("http://localhost:8080/api/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.status);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("user", response.data.user.id);
          navigate("/dashboard");
          //window.location.reload();
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        // setError("Error Connecting to the server");
        toast.error(err?.response?.data?.message);
      });
  };

  const handleBack = (e) => {
    console.log("Navigating back...");
  };

  const backgroundImageStyle = {
    backgroundImage: 'url("mesh-gradient.png")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // height: '100vh', 
  };

  const formStyle = {
    border: '3px solid black', 
    borderRadius: '8px', 
    padding: '2rem',
    textAlign: 'center',
  };

  return (
    <>
      <form>
      <div className="card mb-3" style={{ ...backgroundImageStyle, padding: '12rem', textAlign: 'center', display:'flex', justifyContent:'center',alignItems:'center' }}>
      <div style={formStyle}>   
        <div className="mb-3">
          <h2>Login Form</h2>
          <label className="form-label">
            Username:
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </label>
        </div>

        <div className="d-grid gap-4 d-md-block" align="center">
          <button onClick={handleLogin} className="btn btn-primary" style={{
                  marginInline: "10px",
                }}>
            Login
          </button>
          <a href="/registerform">
          <button className="btn btn-primary" type="button" style={{
                  marginInline: "10px",
                }}>
            Signup
          </button>
          </a>
          <a href="/">
          <button className="btn btn-primary" type="button" onClick={handleBack} style={{
                  marginInline: "10px",
                }}>
            Back
          </button>
          </a>
        </div>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
    </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
