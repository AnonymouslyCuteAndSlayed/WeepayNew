import React from 'react';
import { Col } from 'react-bootstrap';
import { Container, Row, Card, Button } from 'react-bootstrap';


function DashboardActions() {
  const handleAddProposal = () => {
    console.log('Add new proposal clicked');
    // Add your logic here
  };

  const handleAddProject = () => {
    console.log('Add new project clicked');
    // Add your logic here
  };

  const handleIssueInvoice = () => {
    console.log('Issue invoice clicked');
    // Add your logic here
  };

  const handleAddUser = () => {
    console.log('Add new user clicked');
    // Add your logic here
  };

  return (
    <Col lg={4} md={12} className="d-flex justify-content-lg-end justify-content-start mt-lg-0 mt-3">
      <div className="dashboard-actions">
        <button className="dashboard-btn" onClick={handleAddProposal}>
          📄 Add
        </button>
        <button className="dashboard-btn" onClick={handleAddProject}>
          📁 Add
        </button>
        <button className="dashboard-btn" onClick={handleIssueInvoice}>
          📋 Issue
        </button>
        <button className="dashboard-btn dashboard-btn-primary" onClick={handleAddUser}>
          👤 Add
        </button>
      </div>
    </Col>
  );
}

export default DashboardActions;