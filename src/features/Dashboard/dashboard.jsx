import React, { useState } from 'react';
import Sidebar from '../../common/navs/Sidebar/sidebar.jsx';
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
    <>
      <div className="dashboard-container">
        <Sidebar 
          activeItem={activeItem}
          onNavItemClick={handleNavItemClick}
        />
        <div className="content-wrapper">
          <main className="main-content">
            <div className="greetingsText">
                    <h4>Dashboard</h4>  
                    <h1>Hello, {name}</h1>

              <div className="col1">
                <div className="subrow1">
                  {/* Content for subrow1 */}
                </div>
                <div className="subrow2">
                  {/* Content for subrow2 */}
                </div>
                <div className="subrow3">
                  <div className="subcol1">
                    {/* Content for subcol1 */}
                  </div>
                  <div className="subcol2">
                    {/* Content for subcol2 */}
                  </div>
                </div>
              </div>
              <div className="col2">
                <div className="subrow1">
                  {/* Content for col2 subrow1 */}
                </div>
                <div className="subrow2">
                  {/* Content for col2 subrow2 */}
                </div>
              </div>
            </div>
            <div className="row2">
              <div className="col1">
                {/* Content for row2 col1 */}
              </div>
              <div className="col2">
                {/* Content for row2 col2 */}
              </div>
              <div className="col3">
                {/* Content for row2 col3 */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;