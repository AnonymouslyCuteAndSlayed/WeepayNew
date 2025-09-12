import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/AuthorizationPages/Register.css";
import PasswordRequirements from "../../common/components/AuthorizationPage/passwordRequirements";
import AuthPageHeader from "../../common/components/AuthorizationPage/authPageheader";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const isLength = pwd.length >= 8;
    const isUpper = /[A-Z]/.test(pwd);
    const isLower = /[a-z]/.test(pwd);
    const isNumber = /[0-9]/.test(pwd);
    const isSpecial = /[!@#$%^&*]/.test(pwd);
    return isLength && isUpper && isLower && isNumber && isSpecial;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email.endsWith("@gmail.com")) {
      toast.error("Please enter a valid Gmail address");
      return;
    }
    if (!username.trim()) {
      toast.error("Username is required");
      return;
    }
    if (!userType) {
      toast.error("Please select a user type");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password does not meet the requirements");
      return;
    }
    // Navigate to TwoFactorAuth page with email
    navigate("/two-factor-auth", { state: { email } });
  };

  useEffect(() => {
    document.title = "WSS | Register";
  }, []);

  // Inline style for forcing overflow on smaller screens
  
  return (
    <div className="position-relative vh-100 overflow-auto">
      <Container fluid>
        {/* Header Row */}
        <AuthPageHeader />

        {/* Centered Register Card */}
        <Row className="justify-content-center align-items-center py-4 ">
          <Col xs={11} md={9} lg={8}>
            <Card className="Register-card pt-0 px-xs-3 mb-5 align-items-center justify-content-center">
              <Card.Body>
                <div className="title-container">
                  <div className="title-text">
                    <h5 className="welcome-text">Welcome to</h5>
                    <h3 className="user-login-text">User Registration</h3>
                  </div>
                </div>

                <Row className="align-items-center px-4 pb-4">
                  <Col xs={12} sm={8} md={12} lg={6} 
                    className="registerAnimate d-flex justify-content-center mb-3 mb-md-0 sm">
                    <Image
                      src="/animations/registerAnimate.gif"
                      alt="Register GIF"
                      fluid
                    />
                  </Col>

                  <Col xs={12} md={12} lg={6}>
                    <Form onSubmit={handleRegister}>
                      <Form.Group className="mb-3 custom-font" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email (e.g., user@gmail.com)"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="custom-font userInput"
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3 custom-font" controlId="formUserType">
                            <Form.Label>Department</Form.Label>
                            <Form.Select
                              value={userType}
                              onChange={(e) => setUserType(e.target.value)}
                              required
                              className="custom-font userInput"
                            >
                              <option value="">Select Department</option>
                              <option value="IT">IT</option>
                              <option value="Finance">Finance</option>\
                              <option value="guest">Guest</option>

                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3 custom-font" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                              className="custom-font userInput"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

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

                      <Form.Group className="mb-3 custom-font" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="custom-font userInput"
                        />
                      </Form.Group>

                      <PasswordRequirements password={password} />

                      <Button
                        variant="primary"
                        type="submit"
                        className="loginButton w-100 mt-3"
                      >
                        Register
                      </Button>
                      <div className="custom-font text-center mt-4">
                        <span>Already have an account? </span>
                        <br />
                        <Link
                          to="/login"
                          className="custom-font btn btn-link p-0 align-baseline"
                        > Login
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