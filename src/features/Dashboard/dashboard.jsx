import React, { useState } from 'react';
import Sidebar from '../../common/navs/Sidebar/sidebar.jsx';
import "../../styles/dashboard/dashboard.css";

function Dashboard() {
  const [activeItem, setActiveItem] = useState('dashboard');
  
  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
    console.log(`Navigated to: ${itemId}`);
  };

  return (
    <>
      <div className="dashboard-container">
        <Sidebar 
          activeItem={activeItem}
          onNavItemClick={handleNavItemClick}
        />
        <div className="content-wrapper">
          <main className="main-content">
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            {/* Add your dashboard content here */}
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;