import React from 'react';

// Icons component containing all SVG icons
const Icons = {
  Dashboard: () => (
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
  ),

  ClientRecords: () => (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
      {/* Head */}
      <circle cx="12" cy="8" r="4" />
      {/* Shoulders */}
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),

  Proposals: () => (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-8.49 8.49a5 5 0 01-7.07-7.07l8.49-8.49a3 3 0 014.24 4.24l-8.49 8.49a1 1 0 01-1.41-1.41l7.78-7.78" />
    </svg>
  ),

  ProjectRecords: () => (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Folder icon */}
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      {/* Document lines inside folder */}
      <path d="M8 13h8M8 17h6" />
    </svg>
  ),

  Invoice: () => (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Receipt/Document */}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      {/* Dollar sign */}
      <path d="M12 18V6" />
      <path d="M9 9a3 3 0 0 1 3-3 3 3 0 0 1 3 3c0 3-3 3-3 3s-3 0-3-3" />
      <path d="M9 15a3 3 0 0 0 3 3 3 3 0 0 0 3-3" />
    </svg>
  ),

  ActivityLog: () => (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Clock */}
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      {/* Activity dots */}
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
    </svg>
  ),

  DeletedRecords: () => (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Trash can */}
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      {/* Lines inside trash */}
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),

  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="black">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  ),

  Notification: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  )
};

export default Icons;