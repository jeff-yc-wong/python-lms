import React from 'react';

const SidebarMenu = () => {
  return (
    <div className="d-flex" id="wrapper">
      <div className="bg-dark border" id="sidebar-wrapper">
        <div className="list-group list-group-flush">
          <a href="#" className="list-group-item list-group-item-action bg-dark text-white">Dashboard</a>
          <a href="#" className="list-group-item list-group-item-action bg-dark text-white">Modules</a>
          <a href="#" className="list-group-item list-group-item-action bg-dark text-white">Schedule</a>
          <a href="#" className="list-group-item list-group-item-action bg-dark text-white">Settings</a>
          <a href="#" className="list-group-item list-group-item-action bg-dark text-white">Notification</a>
          <a href="#" className="list-group-item list-group-item-action bg-dark text-white">My Profile</a>
          <a href="#" className="list-group-item list-group-item-action bg-dark text-white">Log Out</a>
          <a href="#" className="list-group-item list-group-item-action bg-dark text-white">Help & Support</a>
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;