import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Search, 
  Settings, 
  LogOut,
  Hospital
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/register', icon: <UserPlus size={20} />, label: 'Register Patient' },
    { path: '/patients', icon: <Users size={20} />, label: 'View All Patients' },
    { path: '/search', icon: <Search size={20} />, label: 'Search Patient' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Hospital className="logo-icon" size={32} />
        <span className="logo-text">MediAdmin</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </div>
        <div className="nav-item logout">
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
