import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRef} from "react";
import "../../styles/AuthorizationPages/otpPages.css"; // Reusing the same CSS for consistency
import AuthPageHeader from "../../common/components/AuthorizationPage/AuthPageHeader.jsx";

export default function TwoFactorAuth() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const location = useLocation();
  const email = location.state?.email || "";
  const toastShown = useRef(false);


  useEffect(() => {
  if (email && !toastShown.current) {
    toast.success(`Verification code sent to: ${email}`);
    toastShown.current = true;
  }
}, [email]);

  useEffect(() => {
    document.title = "Weepay Proposal Calculator | Two-Factor Authentication";
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredCode = code.join('');
    if (enteredCode.length === 6) {
      toast.success(`Code verified: ${enteredCode}`);
      // Here you would typically verify the code and navigate to the next page
    } else {
      toast.error("Please enter the full 6-digit code.");
    }
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

                    <Button variant="primary" type="submit" className="forgotButton w-100">
                      Verify
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