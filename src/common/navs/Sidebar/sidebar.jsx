import React, { useState } from "react";
import "../../../styles/common/navs/sidebar/sidebar.css";
import {
  LayoutDashboard,
  UsersRound,
  FolderClock,
  FolderKanban,
  Receipt,
  Trash2,
  FileClock,
  Menu,
  TextAlignStart,
  LogOut,
} from "lucide-react";

const navigationItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard />,
    type: "main",
  },
  {
    id: "records",
    title: "Records",
    icon: <FolderKanban />,
    type: "parent",
    children: [
      { id: "client-records", title: "Clients", icon: <UsersRound /> },
      { id: "proposals", title: "Proposal", icon: <FolderClock /> },
      { id: "projects", title: "Project", icon: <FolderKanban /> },
      { id: "invoice", title: "Invoice", icon: <Receipt /> },
      { id: "trash", title: "Deleted", icon: <Trash2 /> },
    ],
  },
  {
    id: "activity",
    title: "Activity Logs",
    icon: <FileClock />,
    type: "main",
  },
  {
    id: "logout",
    title: "Logout",
    icon: <LogOut />,
    type: "main",
  },
];

const Sidebar = ({ onNavItemClick, onSidebarToggle }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState("");

  const toggleSidebar = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    
    if (onSidebarToggle) {
      onSidebarToggle(newExpandedState);
    }
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (onNavItemClick) onNavItemClick(itemId);
  };

  return (
      <>
          <header className="navs-header">
      
      <div className="brand-container">
                {/* Toggle Menu */}
                <div className="menuHeader">
                  <button
                    className="menuSidebar"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar menu"
                  >
                    {isExpanded ? <TextAlignStart /> : <Menu />}
                  </button>
                </div>

                  <img
                    src="/public/Logos/Logo.png"  
                    alt="WeePay Logo"
                    className="brand-logo"
                  />
                  <span className="brand-text">Weepay Payment Processing</span>
                </div>
              </header>
                    <div className="d-flex">
                      {/* Sidebar */}
                      <div
                        className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}
                        style={{
                          width: isExpanded ? "240px" : "70px",
                          minHeight: "100vh",
                          borderRight: "1px solid #dee2e6",
                          transition: "width 0.3s ease",
                        }}
                      >
            
                {/* Navigation */}
                <div>
                  <div className="sidebarNavs">
                    {navigationItems.map((item) =>
                      item.type === "parent" ? (
                        <div key={item.id}>
                          {/* Parent */}
                          <div
                            className={`sidebar-btn parent-label ${
                              item.children.some((c) => c.id === activeItem)
                                ? "active"
                                : ""
                            }`}
                          >
                            <span className="iconsActive">{item.icon}</span>
                            {isExpanded && <span>{item.title}</span>}
                          </div>

                          {/* Submenu */}
                          {isExpanded && (
                            <div>
                              {item.children.map((child) => (
                                <button
                                  key={child.id}
                                  className={`sidebar-sub-btn ${
                                    activeItem === child.id ? "active-sub" : ""
                                  }`}
                                  onClick={() => handleItemClick(child.id)}
                                >
                                  <span className="subIcons">{child.icon}</span>
                                  <span>{child.title}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        // Normal button
                        <button
                          key={item.id}
                          className={`sidebar-btn ${activeItem === item.id ? "active" : ""}`}
                          onClick={() => handleItemClick(item.id)}
                        >
                          <span className="iconsActive">{item.icon}</span>
                          {isExpanded && <span className="nav-text">{item.title}</span>}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      };

export default Sidebar;