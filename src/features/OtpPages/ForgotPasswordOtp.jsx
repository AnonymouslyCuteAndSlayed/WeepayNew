import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import "../../styles/AuthorizationPages/otpPages.css";
import AuthPageHeader from "../../common/components/AuthorizationPage/AuthPageHeader.jsx";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Weepay Proposal Calculator | Forgot Password";
  }, []);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email.endsWith("@gmail.com")) {
      toast.error("Please enter a valid Gmail address");
      return;
    }
    toast.success(`Password reset link sent to: ${email}`);
    setIsEmailSent(true);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join('');
    if (enteredCode.length === 6) {
      toast.success(`Code verified: ${enteredCode}`);
      navigate('/reset-password');
    } else {
      toast.error("Please enter the full 6-digit code.");
    }
  };

  return (
    <div className="position-relative overflow-auto overflow-lg-visible">
      <Container fluid className="vh-100">
        <AuthPageHeader />

        {/* Container */}
        <Row className="justify-content-center align-items-center vh-75">
          <Col xs={11} md={9} lg={6}>
            <Card className="forgot-card pt-0 px-xs-3 border-0 mb-5">
              <div className="title-container">
                <div className="title-text">
                  <h3 className="otpText">One-time-Password</h3>
                  <h3 className="reseText">Reset Password</h3>
                </div>
              </div>

              <Row className="align-items-center px-4 pb-4">
                <Col xs={12} sm={12} md={6} lg={6} className="d-flex justify-content-center mb-5 mb-md-0">
                  <Image
                    src="/animations/OtpAnimate.gif"
                    alt="Forgot Password GIF"
                    fluid
                  />
                </Col>

                <Col xs={12} md={6}>
                  {!isEmailSent ? (
                    <Form onSubmit={handleForgotPassword}>
                      <Form.Group className="mb-3 custom-font" controlId="formEmail">
                        <Form.Label>Input your registered e-mail account to receive a one-time password (OTP).</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email (e.g., user@gmail.com)"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="custom-font"
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit" className="forgotButton w-100">
                        Send Reset Link
                      </Button>
                    </Form>
                  ) : (
                    <Form onSubmit={handleCodeSubmit}>
                      <Form.Group className="mb-3 custom-font" controlId="formCode">
                        <Form.Label>Enter Verification Code</Form.Label>
                        <Row className="justify-content-center">
                          {code.map((digit, index) => (
                            <Col key={index} xs={2} className="px-1">
                              <Form.Control
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => {
                                  const newCode = [...code];
                                  newCode[index] = e.target.value.replace(/[^0-9]/g, '');
                                  setCode(newCode);
                                  if (e.target.value && index < 5) {
                                    const nextInput = document.getElementById(`code-${index + 1}`);
                                    if (nextInput) nextInput.focus();
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Backspace' && !digit && index > 0) {
                                    const prevInput = document.getElementById(`code-${index - 1}`);
                                    if (prevInput) prevInput.focus();
                                  }
                                }}
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                className="text-center digitInput"
                                id={`code-${index}`}
                              />
                            </Col>
                          ))}
                        </Row>
                      </Form.Group>

                      <Button variant="primary" type="submit" className="forgotButton w-100">
                        Verify Code
                      </Button>

                      <Button 
                        variant="outline-secondary" 
                        className="w-100 mt-2" 
                        onClick={() => setIsEmailSent(false)}
                      >
                        Back to Email Entry
                      </Button>
                    </Form>
                  )}

                  <div className="custom-font text-center mt-4">
                    <span>Remember your password? </span><br />
                    <Link to="/login" className="custom-font btn btn-link p-0 align-baseline">
                      Login
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}