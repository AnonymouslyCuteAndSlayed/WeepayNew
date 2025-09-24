import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "../../../styles/AddProposal/mainCalculator.css"

function RiskBuffer({ setFormData, onNext, onPrevious, currentStep }) {
  const [selections, setSelections] = useState({
    riskBuffer: '',
    clientChangeManagement: ''
  });

  const handleSelectionChange = (field, value) => {
    const updatedSelections = { ...selections, [field]: value };
    setSelections(updatedSelections);

    setFormData(prev => ({
      ...prev,
      projectManagement: updatedSelections
    }));
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Container className="my-4">
      <h4 className="fw-bold mb-4">Risk Assessment & Buffers</h4>
      <Row className="g-3">
        <Col xs={12} md={12}>
          <Form.Group controlId="riskLevel">
            <Form.Label>Risk Level:</Form.Label>
            <Form.Select
              value={selections.riskBuffer}
              onChange={(e) => handleSelectionChange('riskBuffer', e.target.value)}
            >
              <option value="">Choose</option>
              <option value="5">High Risk (40%) - Complex Integration, new technology</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
        <Col xs={12} md={12}>
            {selections.riskBuffer && (
                <div
                    className="mt-2 p-4 border-start border-4 border-primary bg-light w-100 pmCoordresult "
                    style={{ width: "100%" }}
                >
                    Risk Buffer: <strong>{selections.riskBuffer}%</strong>
                </div>
        )}

        </Col>

      <row>

      </row>

      {/* Navigation Buttons */}
      <div className="button-container mt-4">
        <div className="button-left">
          {currentStep > 0 && (
            <button
              className="previousButton btn btn-secondary"
              onClick={onPrevious}
            >
              Previous
            </button>
          )}
        </div>
        <div className="button-right">
          <button className='skip-btn'>
            Skip
          </button>
          <button
            className="nextButton btn btn-primary"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
}

export default RiskBuffer;
