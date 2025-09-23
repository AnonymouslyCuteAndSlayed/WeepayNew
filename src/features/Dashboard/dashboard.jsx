import React, { useState } from 'react';
import Sidebar from '../../common/navs/Sidebar/sidebar.jsx';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DashboardGreeting from "../../features/dashboard/MainSlice/dashboardGreeting.jsx";
import DashboardActions from '../../features/dashboard/MainSlice/dashboardActions.jsx';   
import StatsCardsSection from '../../features/dashboard/MainSlice/statCardsslice.jsx';
import RevenueGrowth from '../../features/dashboard/MainSlice/revenueChart/revenueGrowthslice.jsx';   
import  PointStyleChart from '../Dashboard/MainSlice/revenueChart/yearChart.jsx'
import  ActivityFeed from '../Dashboard/MainSlice/activityFeedSlice.jsx'


function Dashboard() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true); // Track sidebar state
  const email = localStorage.getItem('userEmail');
  const name = email ? email.split('@')[0] : 'User';

  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
    console.log(`Navigated to: ${itemId}`);
  };

  const handleSidebarToggle = (isExpanded) => {
    setSidebarExpanded(isExpanded);
    console.log('Sidebar toggled:', isExpanded);
  };
  
  return (
    <>
      {/* Sidebar */}
      <Sidebar
        activeItem={activeItem}
        onNavItemClick={handleNavItemClick}
        onSidebarToggle={handleSidebarToggle}
      />
      
      {/* Main Content */}
      <div 
        className="dashboard-container normalFont"
        style={{
          marginLeft: sidebarExpanded ? '240px' : '70px', // Match your sidebar widths
          
        }}
      >
        {/* Actions and Greeting part*/}
        <Row className="align-items-center mb-4">
          <Col md={6}>
            <DashboardGreeting name={name} />
          </Col>
          <Col md={6}>
            <DashboardActions />
          </Col>
        </Row>

        {/* Statistic total and revenue cards part*/}
       <Row className="g-4">
          <Col xxl={8} xl={8} lg={8} md={12} className="d-flex flex-column">
            <div className="d-flex flex-column h-100 flex-fill">
              
                <Card.Body className="flex-fill statsContainer">
                  < StatsCardsSection />
                </Card.Body>

              <Card className="flex-fill revenueContainer">
                  <RevenueGrowth />
              </Card>

            </div>
          </Col>

          {/* Activity Feed */}
          <Col xxl={4} xl={4} lg={4} md={12}>
            <Card className="h-100 sticky-top activityFeed">
                <ActivityFeed />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;