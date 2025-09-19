import React, { useState } from "react";
import { Menu, TextAlignStart } from "lucide-react";
import "../../../styles/common/navs/sidebar/sidebar.css";


const Sidebar = ({ onNavItemClick }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState("");

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (onNavItemClick) onNavItemClick(itemId);
  };
};
const NavsHeader = ({ isExpanded, toggleSidebar }) => {
  return (
    <header className="navs-header">
      {/* Toggle Menu */}
      

      <div className="brand-container">
        <img
          src="/public/Logos/Logo.png"  
          alt="WeePay Logo"
          className="brand-logo"
        />
        <span className="brand-text">Weepay Payment Processing</span>
      </div>
    </header>
  );
};

export default NavsHeader;