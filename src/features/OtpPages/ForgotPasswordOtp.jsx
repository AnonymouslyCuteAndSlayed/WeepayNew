import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import "../../styles/AuthorizationPages/otpPages.css";
import AuthPageHeader from "../../common/components/AuthorizationPage/authPageheader.jsx";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "WSS | Forgot Password";
  }, []);

  useEffect(() => {
    if (isEmailSent) {
      setTimeLeft(300);
    }
  }, [isEmailSent]);

  useEffect(() => {
    if (timeLeft === 0 || !isEmailSent) return;
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isEmailSent]);

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
      navigate('/reset-password', { state: { email } });
    } else {
      toast.error("Please enter the full 6-digit code.");
    }
  };

  const handleResend = () => {
    setTimeLeft(300);
    setCode(['', '', '', '', '', '']); // Reset code input
    toast.success("OTP resent to your email");
  };
  // Format timeLeft as mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
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

                      {/* Timer display */}
                      <div className="text-center mb-3 custom-font timerText">
                        Time left: {formatTime(timeLeft)}
                      </div>

                      {timeLeft === 0 && (
                        <div className="text-center mb-3 d-flex flex-column align-items-start">
                          <p className="custom-font mb-0">Did not receive OTP?</p>
                          <Button
                            variant="link"
                            onClick={handleResend}
                            className="p-0 custom-font"
                          >
                            Resend OTP
                          </Button>
                        </div>
                      )}


                      <Button variant="primary" type="submit" className="forgotButton w-100" disabled={timeLeft === 0}>
                        Verify Code
                      </Button>

                     
                      <Button 
                        variant="outline-secondary" 
                        className="w-100 mt-2 custom-font" 
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