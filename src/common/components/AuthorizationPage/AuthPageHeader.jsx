//Authentication Page Header Component
import { Row, Col, Image } from "react-bootstrap";

export default function AuthPageHeader() {
  return (
    <Row className="auth-header text-black py-5 px-lg-5 px-md-5 align-items-center">
      <Col>
        <Image
          className="Logo"
          src="/Logos/LogoWeepayD.png"
          alt="Logo"
          fluid
        />
      </Col>
      <Col className="text-end companyName">
        <h2>Weepay Payment Processing Corporation</h2>
      </Col>
    </Row>
  );
}