import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/AuthorizationPages/Login.css";
import AuthPageHeader from "../../common/components/AuthorizationPage/authPageheader";
import {useAdminApi} from "../../api/admin/adminApi";

export default function Login() {
  const {initiateLogin} = useAdminApi();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to validate if input is a valid email format
  const isValidEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  // Function to validate if input is a valid username format
  const isValidUsername = (input) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    return usernameRegex.test(input);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const isEmail = isValidEmail(emailOrUsername);
    const isUsername = isValidUsername(emailOrUsername);
    
    if (!isEmail && !isUsername) {
      toast.error("Please enter a valid email address or username (at least 3 characters, letters, numbers, and underscores only)");
      setIsLoading(false);
      return;
    }

    if (!emailOrUsername || !password) {
      toast.error("Please enter a valid email/username and password.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await initiateLogin({
        Identifier: emailOrUsername,  // Note: Capital 'I' to match .NET model
        Password: password       // Note: Capital 'P' to match .NET model
      });
      
      localStorage.setItem('userEmail', emailOrUsername);
      toast.success("Login initiated successfully");
      
      // Navigate to TwoFactorAuth page with identifier and from parameter
      navigate("/dashboard", { 
        state: { 
          email: emailOrUsername,
          from: "login"
        } 
      });
      
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response?.status === 401) {
        toast.error("Invalid credentials. Please check your email and password.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "WSS | Login";
  }, []);

  return (
    <div className="position-relative vh-100 overflow-auto ">
      <Container fluid className="min-vh-100">
        {/* Header Row */}
        <AuthPageHeader />

        <Row className="justify-content-center align-items-center">
          <Col xs={11} md={9} lg={6}>
            <Card className="login-card pt-0 px-xs-3 mb-5 p-md-0 p-0 border-0">
              <Card.Body>
                <div className="title-container">
                  <div className="title-text">
                    <h5 className="welcome-text">Welcome to</h5>
                    <h3 className="user-login-text">User Login</h3>
                  </div>
                </div>

                <Row className="align-items-center px-4 pb-4">
                  <Col xs={12} sm={12} md={6} lg={6} className="d-flex justify-content-center mb-3 mb-md-0">
                    <Image 
                      src="/animations/animationRow.gif"
                      alt="Login GIF"
                      fluid 
                    />
                  </Col>

                  <Col xs={12} md={6}>
                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3 custom-font" controlId="formEmailOrUsername">
                        <Form.Label>Username or email</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter username or email"
                          value={emailOrUsername}
                          onChange={(e) => setEmailOrUsername(e.target.value)}
                          required
                          className="custom-font userInput"
                        />
                        
                      </Form.Group>

                      <Form.Group className="mb-3 custom-font" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="custom-font userInput"
                          />
                          <Image
                            src={showPassword ? "/animations/hidePassword.png" : "/icons/showPassword.png"}
                            alt={showPassword ? "Hide Password" : "Show Password"}
                            className="showHideIcon position-absolute end-2 top-50 translate-middle-y md-end-1"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-2 d-flex justify-content-between align-items-center">
                        <Form.Check
                          type="checkbox"
                          label="Remember me"
                          className="rememberMe"
                        />

                        <a
                          href="/forgot-password"
                          className="text-decoration-underline forgotPass mb-2"
                        >
                          Forgot Password?
                        </a>
                      </Form.Group>
                      
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="loginButton w-100"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Loading...' : 'Login'}
                      </Button>

                      <div className="custom-font text-center mt-3">
                        <span>Don't have an account? </span> <br />
                        <Link 
                          to="/register"
                          className="custom-font btn btn-link p-0 align-baseline"
                        >
                          Register
                        </Link>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}