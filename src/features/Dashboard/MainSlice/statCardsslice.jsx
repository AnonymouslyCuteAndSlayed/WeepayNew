import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FileCheck2, FolderOpenDot, ClipboardClock, BookmarkCheck } from 'lucide-react';

const StatsCardsSection = () => {
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

  return (
    <Row>
      <Col xl={12} lg={8} md={12}>
        {/* Statistics part */}
        <Row className="g-4 mb-4">
          <Col xl={3} md={6} xs={6}>
            {createStatCard('approved', <FileCheck2 className='iconStat'/>, 
            '1', 
            'Approved Projects')}
          </Col>
          <Col xl={3} md={6} xs={6}>
            {createStatCard('active', <FolderOpenDot className='iconStat'/>, 
            '1', 
            'Active Projects')}
          </Col>
          <Col xl={3} md={6} xs={6}>
            {createStatCard('pending', <ClipboardClock className='iconStat'/>, 
              '3', 
              'Pending Proposals')}
          </Col>
          <Col xl={3} md={6} xs={6}>
            {createStatCard('finished',<BookmarkCheck className='iconStat'/>, 
            '1', 
            'Finished Projects')}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default StatsCardsSection;