import React, { useState, useEffect } from 'react';
import '../../../styles/common/navs/sidebar/sidebar.css'; // Import your CSS
import {
  FolderClock,
  LayoutDashboard,
  UsersRound,
  FolderKanban,
  Receipt,
  Trash2,
  MessageCircle,
  FileClock,
  Bell,
  Menu,
  TextAlignStart,
  LogOut
} from 'lucide-react';

// Icons
const navigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: (
      <LayoutDashboard />
    )
  },
  {
    id: 'client-records',
    title: 'Client Records',
    icon: (
      <UsersRound />
    )
  },
  {
    id: 'proposals',
    title: 'Proposal Records',
    icon: (
      <FolderClock />
    )
  },
  {
    id: 'projects',
    title: 'Project Records',
    icon: (
      <FolderKanban />
    )
  },
  {
    id: 'Invoice',
    title: 'Invoice Records',
    icon: (
      <Receipt />
    )
  },
  {
    id: 'Trash',
    title: 'Deleted Records',
    icon: (
      <Trash2 />
    )
  },
  {
    id: 'Activity',
    title: 'Activity Logs',
    icon: (
      <FileClock />
    )
  },
  {
    id: 'Logout',
    title: 'Logout',
    icon: (
      <LogOut />
    )
  }
];

const Sidebar = ({ activeItem, onNavItemClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true); // Example: has unread notifications

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const handleNavItemClick = (id) => {
    if (onNavItemClick) onNavItemClick(id);
  };
  const handleNotificationClick = () => {
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
            {isExpanded ? <TextAlignStart /> : <Menu />}
          </button>
          <span className="menu-title">Weepay Proposal Calculator</span>
        </div>
        <div className="right-section d-flex align-items-center">
          <button className="notification-btn" onClick={handleNotificationClick} aria-label="Notifications">
            <Bell />
            {hasNotifications && <span className="notification-dot"></span>}
          </button>
          <div>
            <button className="message-btn" aria-label="messages">
              <MessageCircle />
            </button>
          </div>
        </div>
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
    </div>
  );
};

export default Sidebar;
