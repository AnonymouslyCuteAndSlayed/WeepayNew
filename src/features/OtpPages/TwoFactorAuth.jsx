import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRef} from "react";
import "../../styles/AuthorizationPages/otpPages.css"; // Reusing the same CSS for consistency
import AuthPageHeader from "../../common/components/AuthorizationPage/authPageheader.jsx";
import { useAdminApi } from "../../api/admin/adminApi";

export default function TwoFactorAuth() {
  const { verifyOtp } = useAdminApi();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const email = location.state?.email || "";
  const fromPage = location.state?.from || "login"; // Track which page user came from
  const toastShown = useRef(false);
  const navigate = useNavigate();

  // Timer state and effect
  const [timeLeft, setTimeLeft] = useState(300); 
  useEffect(() => {
    if (email && !toastShown.current) {
      toast.success(`Verification code sent to: ${email}`);
      toastShown.current = true;
    }
  }, [email]);

  useEffect(() => {
    document.title = "Weepay Proposal Calculator | Two-Factor Authentication";
  }, []);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredCode = code.join('');
    
    if (enteredCode.length !== 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the verifyOtp API with proper parameters matching your .NET controller
      const response = await verifyOtp({
        Email: email,
        OtpCode: enteredCode,
        Purpose: fromPage === "register" ? "CreateAccount" : "Login"  // Set purpose based on context
      });
      
      if (response.IsSuccess || response.isSuccess) {
        toast.success("Authentication successful!");
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        
        if (fromPage === "register" || fromPage === "reset") {
          if (fromPage === "reset") {
            toast.success("Password reset successfully");
          }
          navigate('/login');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error("Invalid or expired code. Please try again.");
        setCode(['', '', '', '', '', '']);
        document.getElementById('code-0')?.focus();
      }
      
    } catch (error) {
      console.error("Two-factor auth error:", error);
      
      if (error.response?.status === 400) {
        toast.error("Invalid or expired verification code.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Verification failed. Please try again.");
      }
      
      setCode(['', '', '', '', '', '']);
      document.getElementById('code-0')?.focus();
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(300);
    toast.success("OTP resent to your email");
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="position-relative">
      <Container fluid className="vh-100">
        <AuthPageHeader />

        {/* Container */}
        <Row className="justify-content-center align-items-center vh-75 mb-5">
          <Col xs={11} md={9} lg={6}>
            <Card className="forgot-card pt-0 px-xs-3 border-0">
              <div className="title-container">
                <div className="title-text">
                  <h3 className="otpText">Two-Factor</h3>
                  <h3 className="reseText">Authentication</h3>
                </div>
              </div>

              <Row className="align-items-center px-4 pb-4">
                <Col xs={12} sm={12} md={6} lg={6} className="d-flex justify-content-center mb-3 mb-md-0">
                  <Image
                    src="/animations/OtpAnimate.gif"
                    alt="Two-Factor Authentication GIF"
                    fluid
                  />
                </Col>

                <Col xs={12} md={6}>
                  <Form onSubmit={handleVerify}>
                    <Form.Group className="mb-3 custom-font" controlId="formCode">
                      <Form.Label>Enter the verification code sent to your email.</Form.Label>
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
                                  document.getElementById(`code-${index + 1}`).focus();
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Backspace' && !digit && index > 0) {
                                  document.getElementById(`code-${index - 1}`).focus();
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
                    <div className="text-center mb-3 custom-font" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                      Time left: {formatTime(timeLeft)}
                    </div>

                    {/* resend otp */}
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

                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="forgotButton w-100" 
                      disabled={timeLeft === 0 || isLoading}
                    >
                      {isLoading ? 'Verifying...' : 'Verify'}
                    </Button>

                  </Form>

                  <div className="custom-font text-center mt-4">
                    <span>Wrong account? </span> <br />
                      <Link to="/login"
                        className="custom-font btn btn-link p-0 align-baseline">
                          Back to Login
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