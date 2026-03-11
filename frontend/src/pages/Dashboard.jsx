import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserMinus, Activity } from 'lucide-react';
import { patientService } from '../services/apiService';
import './Dashboard.css';

const StatCard = ({ title, value, icon, color, trend }) => (
  <div className="stat-card glass-card">
    <div className={`stat-icon ${color}`}>
      {icon}
    </div>
    <div className="stat-info">
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
      {trend && <span className="stat-trend">{trend}</span>}
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    admitted: 0,
    discharged: 0,
    outpatients: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await patientService.getAll();
        const patients = response.data;
        
        setStats({
          total: patients.length,
          admitted: patients.filter(p => p.status === 'Admitted').length,
          discharged: patients.filter(p => p.status === 'Discharged').length,
          outpatients: patients.filter(p => p.patientType === 'Outpatient').length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      <div className="stats-grid">
        <StatCard 
          title="Total Patients" 
          value={stats.total} 
          icon={<Users size={24} />} 
          color="blue" 
          trend="+12% from last month"
        />
        <StatCard 
          title="Admitted" 
          value={stats.admitted} 
          icon={<UserCheck size={24} />} 
          color="green" 
          trend="Currently in hospital"
        />
        <StatCard 
          title="Discharged" 
          value={stats.discharged} 
          icon={<UserMinus size={24} />} 
          color="orange" 
          trend="Ready to go home"
        />
        <StatCard 
          title="Outpatients" 
          value={stats.outpatients} 
          icon={<Activity size={24} />} 
          color="purple" 
          trend="Visiting for checkup"
        />
      </div>

      <div className="dashboard-content">
        <div className="recent-activity glass-card">
          <h2>Recent Activity</h2>
          <div className="activity-placeholder">
            <p>No recent activity records to display.</p>
          </div>
        </div>
        
        <div className="hospital-status glass-card">
          <h2>Department Status</h2>
          <div className="dept-grid">
            <div className="dept-item">
              <span>Cardiology</span>
              <div className="progress-bar"><div className="progress" style={{width: '75%'}}></div></div>
            </div>
            <div className="dept-item">
              <span>Neurology</span>
              <div className="progress-bar"><div className="progress" style={{width: '45%'}}></div></div>
            </div>
            <div className="dept-item">
              <span>Pediatrics</span>
              <div className="progress-bar"><div className="progress" style={{width: '90%'}}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
