import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ title }) => {
  return (
    <div className="navbar">
      <div className="nav-title">
        <h1>{title}</h1>
        <p>Welcome back to Hospital Admin</p>
      </div>

      <div className="nav-actions">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search anything..." />
        </div>
        
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge"></span>
        </button>

        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Dr. Arnav Gupta</span>
            <span className="user-role">Administrator</span>
          </div>
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
