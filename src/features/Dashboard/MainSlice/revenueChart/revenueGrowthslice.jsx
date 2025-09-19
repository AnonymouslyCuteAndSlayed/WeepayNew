import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { ChartNoAxesCombined } from 'lucide-react';
import PointStyleChart from "./yearChart"

function RevenueGrowth() {
  return (
    <Card className="revenue-card">
      <Card.Body className="dashboard-card-body">
        <div className="section-header">
          <span className="section-icon"><ChartNoAxesCombined size={20} /></span>
          <h3 className="section-title">Revenue Growth Status</h3>
        </div>
        <Row className="g-3">
          <Col lg={8} xs={12}>
            <div className="revenue-chart">
              <PointStyleChart />
            </div>
          </Col>
          <Col lg={4} xs={12}>
            <div className="revenue-period">
              <span className="revenue-chart-label">Year: 2025</span>
              <br />
              <span>Focus Month: September</span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default RevenueGrowth;
