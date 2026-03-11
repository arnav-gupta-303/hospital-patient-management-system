import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, UserRound, Eye, Edit2, Trash2 } from 'lucide-react';
import { patientService } from '../services/apiService';
import './PatientList.css';

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientService.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      try {
        await patientService.delete(id);
        toast.success('Patient record deleted');
        setPatients(prev => prev.filter(p => p._id !== id));
      } catch (error) {
        toast.error('Failed to delete patient');
        console.error('Error deleting patient:', error);
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchPatients();
      return;
    }
    
    try {
      setLoading(true);
      const response = await patientService.search(searchTerm);
      setPatients(response.data);
    } catch (error) {
      console.error('Error searching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => 
    statusFilter === 'All' ? true : p.status === statusFilter
  );

  return (
    <div className="patient-list-container">
      <div className="list-header glass-card">
        <form className="search-box" onSubmit={handleSearch}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by patient name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="filters">
          <div className="filter-item">
            <Filter size={16} />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Admitted">Admitted</option>
              <option value="Discharged">Discharged</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container glass-card">
        {loading ? (
          <div className="table-loading">Loading patients...</div>
        ) : (
          <table className="patient-table">
            <thead>
              <tr>
                <th><UserRound size={16} /> Patient</th>
                <th>ID</th>
                <th>Age/Gender</th>
                <th>Disease</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient._id}>
                    <td>
                      <div className="patient-info">
                        <span className="name">{patient.fullName}</span>
                        <span className="email">{patient.email}</span>
                      </div>
                    </td>
                    <td><span className="id-badge">{patient.patientID}</span></td>
                    <td>{patient.age} / {patient.gender}</td>
                    <td>{patient.disease}</td>
                    <td>{patient.doctorAssigned}</td>
                    <td>
                      <span className={`status-badge ${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="icon-btn view" title="View"><Eye size={16} /></button>
                        <button 
                          className="icon-btn edit" 
                          title="Edit"
                          onClick={() => navigate(`/update/${patient._id}`)}
                        ><Edit2 size={16} /></button>
                        <button 
                          className="icon-btn delete" 
                          title="Delete"
                          onClick={() => handleDelete(patient._id)}
                        ><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">No patient records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientList;
