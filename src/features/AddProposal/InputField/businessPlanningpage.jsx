import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

function BusinessPlanning({ setFormData, onNext, onPrevious, currentStep }) {
  const [selections, setSelections] = useState({
    profitMargin: '',
    businessOverhead: '',
    requiredMarkup: ''
  });

  const handleSelectionChange = (field, value) => {
    const updatedSelections = { ...selections, [field]: value };
    setSelections(updatedSelections);

    setFormData(prev => ({
      ...prev,
      businessPlanning: updatedSelections
    }));
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Container className="my-4">
      <h4 className="fw-bold mb-4">Business Planning &amp; Profit Targets</h4>
      <Row className="g-3">
        <Col xs={12} md={4}>
          <Form.Group controlId="profitMargin">
            <Form.Label>Target Net Profit Margin (%)</Form.Label>
            <Form.Select
              value={selections.profitMargin}
              onChange={(e) => handleSelectionChange('profitMargin', e.target.value)}
            >
              <option value="">Choose</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group controlId="businessOverhead">
            <Form.Label>Business Overhead (%)</Form.Label>
            <Form.Select
              value={selections.businessOverhead}
              onChange={(e) => handleSelectionChange('businessOverhead', e.target.value)}
            >
              <option value="">Choose</option>
              <option value="10">10%</option>
              <option value="20">20%</option>
              <option value="30">30%</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group controlId="requiredMarkup">
            <Form.Label>Required Markup (%)</Form.Label>
            <Form.Select
              value={selections.requiredMarkup}
              onChange={(e) => handleSelectionChange('requiredMarkup', e.target.value)}
            >
              <option value="">Choose</option>
              <option value="15">15%</option>
              <option value="25">25%</option>
              <option value="35">35%</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

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

export default BusinessPlanning;
