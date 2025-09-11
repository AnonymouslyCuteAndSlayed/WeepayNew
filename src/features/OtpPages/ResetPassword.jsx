import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/AuthorizationPages/Register.css"; // Reusing the same CSS for consistency
import PasswordRequirements from "../../common/components/AuthorizationPage/PasswordRequirements.jsx";
import AuthPageHeader from "../../common/components/AuthorizationPage/AuthPageHeader.jsx";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  
  // Get email from navigation state or use a default
  const userEmail = location.state?.email || "";

  const validatePassword = (pwd) => {
    const isLength = pwd.length >= 8;
    const isUpper = /[A-Z]/.test(pwd);
    const isLower = /[a-z]/.test(pwd);
    const isNumber = /[0-9]/.test(pwd);
    const isSpecial = /[!@#$%^&*]/.test(pwd);
    return isLength && isUpper && isLower && isNumber && isSpecial;
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password does not meet the requirements");
      return;
    }
    toast.success("Password reset successful");
  };

  useEffect(() => {
    document.title = "Weepay Proposal Calculator | Reset Password";
  }, []);

  return (
    <div className="position-relative">
      <Container fluid className="vh-100">
        {/* Header Row */}
        <AuthPageHeader />

        {/* Centered Reset Password Card */}
        <Row className="justify-content-center align-items-center vh-75 mb-5">
          <Col xs={11} md={9} lg={5}>
            <Card className="Register-card pt-0 px-xs-3 mb-5 align-items-center justify-content-center">
              <div className="title-container">
                <div className="title-text">
                  <h5 className="welcome-text">Reset Your</h5>
                  <h3 className="user-login-text">Password</h3>
                </div>
              </div>

              <Row className="align-items-center px-4 pb-4">
                
                <Col xs={12} md={12} lg={12}>
                  <Form onSubmit={handleResetPassword}>
                    {/* Username Display */}
                    <div className="mb-3 custom-font ">
                      <strong className="fs-5">Username: {userEmail.split('@')[0]}</strong>
                    </div>

                    <Form.Group className="mb-3 custom-font" controlId="formPassword">
                      <Form.Label>New Password</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
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
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm new password"
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
                      Reset Password
                    </Button>
                    <div className="custom-font text-center mt-4">
                      <span>Remember your password? </span>
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
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}