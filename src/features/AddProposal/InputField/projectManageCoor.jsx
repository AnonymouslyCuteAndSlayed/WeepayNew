import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";


function ProjectManagement({ setFormData, onNext, onPrevious, currentStep }) {
  const [selections, setSelections] = useState({
    pmoCoordination: '',
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
      <h4 className="fw-bold mb-4">Project Management &amp; Coordination</h4>
      <Row className="g-3">
        <Col xs={12} md={6}>
          <Form.Group controlId="pmoCoordination">
            <Form.Label>PMO Coordination (% of labor):</Form.Label>
            <Form.Select
              value={selections.pmoCoordination}
              onChange={(e) => handleSelectionChange('pmoCoordination', e.target.value)}
            >
              <option value="">Choose</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="clientChangeManagement">
            <Form.Label>Client Change Management (% of labor):</Form.Label>
            <Form.Select
              value={selections.clientChangeManagement}
              onChange={(e) => handleSelectionChange('clientChangeManagement', e.target.value)}
            >
              <option value="">Choose</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="20">20%</option>
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

export default ProjectManagement;
