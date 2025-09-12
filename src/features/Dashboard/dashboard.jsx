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
            <div className="row1">
                    <p>Dashboard</p> <br></br>

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