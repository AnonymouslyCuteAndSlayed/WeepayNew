import React from 'react';
import "../../../styles/dashboard/dashboard.css";
import { Col } from 'react-bootstrap';
import { 
  FilePlus,
  FolderKanban,
  ReceiptText,
  UserPlus 

 } from 'lucide-react';
 

function DashboardActions() {
  const handleAddProposal = () => {
    console.log('Add new proposal clicked');
  };

  const handleAddProject = () => {
    console.log('Add new project clicked');
  };

  const handleIssueInvoice = () => {
    console.log('Issue invoice clicked');
  };

  const handleAddUser = () => {
    console.log('Add new user clicked');
  };

  return (
    <Col lg={12} md={12} className="d-flex justify-content-lg-end justify-content-start mt-lg-0 mt-3 p-0">
      <div className="dashboard-actions" >
        <button className="dashboard-btn " 
          onClick={handleAddProposal}>
           <FilePlus /> Add <br /> Proposal
        </button>
        <button className="dashboard-btn"
          onClick={handleAddProject}>
            <FolderKanban /> Add <br /> Project
        </button>
        <button className="dashboard-btn" 
          onClick={handleIssueInvoice}>
             <ReceiptText /> Issue <br /> Invoice
        </button>
        <button className="dashboard-btn dashboard-btn-primary" 
          onClick={handleAddUser}>
            <UserPlus /> Add <br /> Client
        </button>
      </div>
    </Col>
  );
}

export default DashboardActions;