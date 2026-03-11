import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PatientRegistration from './pages/PatientRegistration';
import PatientList from './pages/PatientList';
import SearchPatient from './pages/SearchPatient';
import UpdatePatient from './pages/UpdatePatient';
import './App.css';

function App() {
  const location = useLocation();
  
  // Map routes to titles
  const getTitle = () => {
    switch(location.pathname) {
      case '/': return 'Dashboard';
      case '/register': return 'Patient Registration';
      case '/patients': return 'Patient Directory';
      case '/search': return 'Search Records';
      default: 
        if(location.pathname.startsWith('/update/')) return 'Update Patient';
        return 'Hospital Management';
    }
  };

  return (
    <div className="app-layout">
      <Toaster position="top-right" />
      <Sidebar />
      <main className="main-content">
        <Navbar title={getTitle()} />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<PatientRegistration />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/search" element={<SearchPatient />} />
            <Route path="/update/:id" element={<UpdatePatient />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
