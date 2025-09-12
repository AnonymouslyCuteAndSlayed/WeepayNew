import React, { useState, useEffect } from 'react';
import '../common/navs/sidebar/sidebar.jsx'; // Import your CSS

// Navigation items data
const navigationItems = [
  {
  id: 'dashboard',
  title: 'Dashboard',
  icon: (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
      {/* Top-left square */}
      <rect x="3" y="3" width="7" height="7" rx="2" />
      {/* Top-right square */}
      <rect x="14" y="3" width="7" height="7" rx="2" />
      {/* Bottom-left square */}
      <rect x="3" y="14" width="7" height="7" rx="2" />
      {/* Bottom-right circle (instead of square) */}
      <circle cx="18" cy="18" r="4" />
    </svg>
  )
}
,
{
  id: 'client-records',
  title: 'Client Records',
  icon: (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
      {/* Head */}
      <circle cx="12" cy="8" r="4" />
      {/* Shoulders */}
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  )
},
{
  id: 'proposals',
  title: 'Proposal Records',
  icon: (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-8.49 8.49a5 5 0 01-7.07-7.07l8.49-8.49a3 3 0 014.24 4.24l-8.49 8.49a1 1 0 01-1.41-1.41l7.78-7.78" />
    </svg>
  )
},

{

  id: 'projects', 
  title: 'Project records',
  icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
  {/* Small circle (dot) */}
  <circle cx="12" cy="6" r="1" />
  
  {/* Line + checkmark */}
  <path d="M6 17h12M10 12l2.8 2.8 3.9-3.9M18 12V8h-4l-2.5 2.5L10 9l-4 4" />
  
  {/* Outer box */}
  <rect x="4" y="4" width="16" height="16" rx="2" />
</svg>
  )
},
  { id: 'calendar', title: 'Calendar', icon: (<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>) },
  { id: 'settings', title: 'Settings', icon: (<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82..."></path></svg>) }
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [hasNotifications, setHasNotifications] = useState(true); // Example: has unread notifications

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const handleNavItemClick = (id) => setActiveItem(id);
  const handleNotificationClick = () => {
    // Example: Toggle notification state or show notification panel
    setHasNotifications(!hasNotifications);
    alert(hasNotifications ? 'You have new notifications!' : 'No new notifications');
  };

  useEffect(() => {
        document.title = "WSS | Dashboard";
      }, []);

  return (
    <div className="h-100">
      {/* Menu Container */}
      <div className="menu-container d-flex align-items-center justify-content-between px-3">
        <div className="left-section d-flex align-items-center">
          <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="black">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <span className="menu-title">Weepay Proposal Calculator</span>
        </div>
        <button className="notification-btn" onClick={handleNotificationClick} aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          {hasNotifications && <span className="notification-dot"></span>}
        </button>

      </div>

      {/* Sidebar */}
      <nav className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
        <div className="sidebar-nav">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleNavItemClick(item.id)}
            >
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-text">{item.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content"></main>
    </div>
  );
};

export default Sidebar;