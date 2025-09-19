import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FileCheck2, FolderOpenDot, ClipboardClock, BookmarkCheck, ChartNoAxesCombined, Clock10 } from 'lucide-react';



  const createStatCard = (type, icon, number, label) => (
    <Card className="stat-card" style={{ borderRadius: "10px", border:"none"}}>
      <div className={`stat-card-border-${type}`}></div>
      <div className="stat-label">
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className={`stat-icon stat-icon-${type}`} style={{ display: 'inline-block' }}>
          {icon}
        </div>
        <div className={`stat-number stat-number-${type}`} 
        style={{display: 'inline-block', 
        textAlign: 'center',
        minWidth: '30px'}}>
          {number}
        </div>
      </div>
    </Card>
  );

function MonthlyOverview() {
  return (
    <Card className="dashboard-card">
      <Card.Body className="dashboard-card-body">
        <div className="section-header-minimal">
          <span className="section-icon-small">#</span>
          <h3 className="section-title-small">Monthly Project Overview</h3>
        </div>
        <div className="section-subtitle">September</div>
        <Row className="g-3">
          <Col lg={4} xs={12}>
            <div className="overview-card">
              <h4 className="overview-card-title">Total Projects</h4>
              <div className="overview-chart-placeholder">Chart Area</div>
            </div>
          </Col>
          <Col lg={4} xs={12}>
            <div className="overview-card">
              <h4 className="overview-card-title">Completed Projects</h4>
              <div className="overview-chart-placeholder">Chart Area</div>
            </div>
          </Col>
          <Col lg={4} xs={12}>
            <div className="overview-card">
              <h4 className="overview-card-title">Total number of Clients</h4>
              <div className="overview-chart-placeholder">Chart Area</div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default MonthlyOverview;
