import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    address: "",
    mobile_no: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.mobile_no.trim()) {
      newErrors.mobile_no = "Contact No is required";
    } else if (!/^\d{10}$/.test(formData.mobile_no)) {
      newErrors.email = "Invalid mobile no format";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    const response = await axios
      .post("http://localhost:8080/api/auth/register", formData)
      .then((response) => {
        alert("Data Added Successfully");
        navigate("/loginform");
      })
      .catch((error) => console.error("Registration Failed:", error.message));
  };
  const handleback = (e) => {
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
    <div
      style={{
        ...backgroundImageStyle,
        padding: "10rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-3 mb-2 bg-primary-subtle text-emphasis-success"
      >
        <h2 align="center">Signup Form</h2>
        <div className="row">
          <div className="col">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>
          <div className="col">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-control"
              aria-label="Small select example"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <span style={{ color: "red" }}>{errors.gender}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              rows="4"
            />
            {errors.address && (
              <span style={{ color: "red" }}>{errors.address}</span>
            )}
          </div>
          <div className="col">
            <label htmlFor="mobileno" className="form-label">
              MobileNo:
            </label>
            <input
              type="number"
              id="mobile_no"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              className="form-control"
            />
            {errors.mobileno && (
              <span style={{ color: "red" }}>{errors.mobileno}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </div>
          <div className="col">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
            />
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}
          </div>
        </div>
        <br />
        <div className="d-grid gap-2 d-md-block" align="center">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSubmit}
            style={{
              marginInline: "10px",
            }}
          >
            Submit
          </button>

          <a href="/loginform">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleback}
              style={{
                marginInline: "10px",
              }}
            >
              Back
            </button>
          </a>
        </div>
      </form>
    </div>
  );

};

export default RegisterForm;
