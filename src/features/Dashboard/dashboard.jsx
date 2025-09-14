import React, { useState } from 'react';
import Sidebar from '../../common/navs/Sidebar/sidebar.jsx';
import { mdiHandWaveOutline, mdiAccount } from "@mdi/js";
import Icon from '@mdi/react';
import "../../styles/dashboard/dashboard.css";

function Dashboard() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const email = localStorage.getItem('userEmail');
  const name = email ? email.split('@')[0] : 'User';

  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
    console.log(`Navigated to: ${itemId}`);
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        activeItem={activeItem}
        onNavItemClick={handleNavItemClick}
      />

      <div className="content-wrapper">
        <main className="main-content">
          {/* ===== Greeting Section ===== */}
          <div className="greetings">
            <h4>Dashboard</h4>
            <h1 className="fw-bold">
              Hello, {name}{' '}
              <span className="username-icon">
                <Icon path={mdiHandWaveOutline} size={1.5} />
              </span>
            </h1>
          </div>

          {/* ===== Row 1: Stats + Activities ===== */}
          <div className="row row-top">
            <div className="top-stats">
              <div className="stat-box">
                <Icon path={mdiAccount} size={1} />
                <p>Approved Projects</p>
                <h3>1</h3>
              </div>
              <div className="stat-box">
                <Icon path={mdiAccount} size={1} />
                <p>Active Projects</p>
                <h3>1</h3>
              </div>
              <div className="stat-box">
                <Icon path={mdiAccount} size={1} />
                <p>Pending Proposals</p>
                <h3>3</h3>
              </div>
              <div className="stat-box">
                <Icon path={mdiAccount} size={1} />
                <p>Finished Projects</p>
                <h3>1</h3>
              </div>
            </div>

            <div className="activities-feed">
              <h4>Recent Activities Feed</h4>
              <p>See what others are doing!</p>
              {/* Activity items here */}
            </div>
          </div>

          {/* ===== Row 2: Revenue Growth ===== */}
          <div className="row row-revenue">
            <div className="revenue-box">
              <h4>Revenue Growth Status</h4>
              <p>2025</p>
            </div>
            <div className="revenue-box">
              <h4>September</h4>
            </div>
          </div>

          {/* ===== Row 3: Monthly Overview ===== */}
          <div className="row row-overview">
            <div className="overview-box">
              <h5>Total Projects</h5>
            </div>
            <div className="overview-box">
              <h5>Completed Projects</h5>
            </div>
            <div className="overview-box">
              <h5>Total number of Clients</h5>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
