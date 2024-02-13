import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      const formData = {
        email,
        password,
      };
      try {
        const response = await axios.post(
          "https://task-manager-mu-lime.vercel.app/api/v1/login",
          formData
        );
        localStorage.setItem("auth", JSON.stringify(response.data.token));
        toast.success("Login successful");
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please add valid token");
        } else {
          setError(err.message);
        }
      }
    } else {
      setError("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/dashboard");
    }
  }, []);

  return (  
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 nithin">
          <div className="card border">
            <div className="card-body">
              <div className="login-right-container">
                <div className="login-center">
                  <h2>Welcome back!</h2>
                  <p>Please enter your details</p>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleLoginSubmit}>
                    <input type="email" placeholder="Email" name="email" />
                    <div className="pass-input-div">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                      />
                      {showPassword ? (
                        <FaEyeSlash
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      ) : (
                        <FaEye
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      )}
                    </div>
                    <div className="login-center-options">
                      <div className="remember-div">
                        <input type="checkbox" id="remember-checkbox" />
                        <label htmlFor="remember-checkbox">
                          Remember for 30 days
                        </label>
                      </div>
                      <a href="#" className="forgot-pass-link">
                        Forgot password?
                      </a>
                    </div>
                    <div className="login-center-buttons">
                      <button type="submit">Log In</button>
                    </div>
                  </form>
                </div>
                <p className="login-bottom-p">
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
