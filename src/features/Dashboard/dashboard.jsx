import React, { useState } from 'react';
import Sidebar from '../../common/navs/Sidebar/sidebar.jsx';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Icon from '@mdi/react';
import "../../styles/dashboard/dashboard.css";
import DashboardGreeting from "../../features/dashboard/MainSlice/dashboardGreeting.jsx";
import DashboardActions from '../../features/dashboard/MainSlice/dashboardGreeting.jsx';   



function Dashboard() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const email = localStorage.getItem('userEmail');
  const name = email ? email.split('@')[0] : 'User';

  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
    console.log(`Navigated to: ${itemId}`);
  };

  const createStatCard = (type, icon, number, label) => (
    <Card className="stat-card">
      <div className={`stat-card-border-${type}`}></div>
      <div className={`stat-icon stat-icon-${type}`}>
        {icon}
      </div>
      <div className={`stat-number stat-number-${type}`}>
        {number}
      </div>
      <div className="stat-label">
        {label}
      </div>
    </Card>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeItem}
        onNavItemClick={handleNavItemClick}
      />

      {/* Main Content */}
      <div className="content-wrapper normalFont">
        <main className="main-content">
          <Container 
            fluid >
            {/* Header Section */}
           <Row className="dashboard-header">
              <DashboardGreeting name={name} />


              <Col lg={4} md={12} xs={12} className="d-flex justify-content-lg-end mt-lg- mt-3">
                <div className="dashboard-actions">
                  <button className="dashboard-btn">
                    📄 Add
                  </button>
                  <button className="dashboard-btn">
                    📁 Add
                  </button>
                  <button className="dashboard-btn">
                    📋 Issue
                  </button>
                  <button className="dashboard-btn dashboard-btn-primary">
                    👤 Add 
                  </button>
                </div>
              </Col>
            </Row>

            {/* Main Dashboard Grid */}
            <Row>
              {/* Main Content Area */}
              <Col xl={8} lg={8} md={6} >
                {/* Project Statistics Row */}
                <Row className="g-4 mb-4  ">
                  <Col xl={3} md={6} xs={6}>
                    {createStatCard('approved', 'Approved Projects', '1', )}
                  </Col>
                  <Col xl={3} md={6} xs={6}>
                    {createStatCard('active', 'Active Projects', '1', '')}
                  </Col>
                  <Col xl={3} md={6} xs={6}>
                    {createStatCard('pending', 'Pending Proposals', '3', '')}
                  </Col>
                  <Col xl={3} md={6} xs={6}>
                    {createStatCard('finished', 'Finished Projects', '1', '')}
                  </Col>
                </Row>

                {/* Revenue Growth Status */}
                <Card className="dashboard-card mb-4">
                  <Card.Body className="dashboard-card-body">
                    <div className="section-header">
                      <span className="section-icon">📈</span>
                      <h3 className="section-title">
                        Revenue Growth Status
                      </h3>
                    </div>
                    <Row className="g-3">
                      <Col lg={8} xs={12}>
                        <div className="revenue-chart">
                          <span className="revenue-chart-label">
                            2025
                          </span>
                        </div>
                      </Col>
                      <Col lg={4} xs={12}>
                        <div className="revenue-period">
                          September
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Monthly Project Overview */}
                <Card className="dashboard-card">
                  <Card.Body className="dashboard-card-body">
                    <div className="section-header-minimal">
                      <span className="section-icon-small">#</span>
                      <h3 className="section-title-small">
                        Monthly Project Overview
                      </h3>
                    </div>
                    <div className="section-subtitle">
                      September
                    </div>
                    <Row className="g-3">
                      <Col lg={4} xs={12}>
                        <div className="overview-card">
                          <h4 className="overview-card-title">
                            Total Projects
                          </h4>
                          <div className="overview-chart-placeholder">
                            Chart Area
                          </div>
                        </div>
                      </Col>
                      <Col lg={4} xs={12}>
                        <div className="overview-card">
                          <h4 className="overview-card-title">
                            Completed Projects
                          </h4>
                          <div className="overview-chart-placeholder">
                            Chart Area
                          </div>
                        </div>
                      </Col>
                      <Col lg={4} xs={12}>
                        <div className="overview-card">
                          <h4 className="overview-card-title">
                            Total number of Clients
                          </h4>
                          <div className="overview-chart-placeholder">
                            Chart Area
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              {/* Activity Feed Sidebar */}
              <Col xl={4} lg={4} xs={12} className="mt-xl-0 mt-4">
                <Card className="activity-sidebar">
                  <Card.Body className="activity-body">
                    <div className="section-header-minimal">
                      <span>🔄</span>
                      <h3 className="section-title-small">
                        Recent Activities Feed
                      </h3>
                    </div>
                    <div className="activity-subtitle">
                      See what others are doing
                    </div>
                    
                    <div className="activity-day">
                      Today
                    </div>
                    
                    <div className="activity-feed">
                      <div className="activity-item">
                        <div className="activity-avatar activity-avatar-finance">
                          F
                        </div>
                        <div className="activity-content">
                          <div className="activity-title">
                            Finance
                            <span className="activity-time">
                              2 hrs ago
                            </span>
                          </div>
                          <div className="activity-description">
                            Anna R. issued invoice #INV-1023 for Project Phoenix
                          </div>
                        </div>
                      </div>
                      
                      <div className="activity-item">
                        <div className="activity-avatar activity-avatar-admin">
                          A
                        </div>
                        <div className="activity-content">
                          <div className="activity-title">
                            Admin
                            <span className="activity-time">
                              6 hours ago
                            </span>
                          </div>
                          <div className="activity-description">
                            Sally G. approved the proposal for PrimeCorp Logistics
                          </div>
                        </div>
                      </div>
                      
                      <div className="activity-item">
                        <div className="activity-avatar activity-avatar-pm">
                          P
                        </div>
                        <div className="activity-content">
                          <div className="activity-title">
                            Project Manager
                            <span className="activity-time">
                              1 day ago
                            </span>
                          </div>
                          <div className="activity-description">
                            Mark L. updated the status of Greenbuilds Expansion from On-Hold to In Progress
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;