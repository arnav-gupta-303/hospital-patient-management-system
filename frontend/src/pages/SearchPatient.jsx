import React, { useState } from 'react';
import { Search, Edit2, Trash2, Eye, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { patientService } from '../services/apiService';
import './PatientList.css'; // Reusing styles

const SearchPatient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const response = await patientService.search(searchTerm);
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await patientService.delete(id);
      setResults(prev => prev.filter(p => p._id !== id));
    }
  };

  return (
    <div className="patient-list-container">
      <div className="list-header glass-card">
        <form className="search-box" style={{maxWidth: '100%'}} onSubmit={handleSearch}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Enter patient full name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button type="submit">Search Patient</button>
        </form>
      </div>

      <div className="table-container glass-card">
        {!searched ? (
          <div className="no-data">Enter a name above to start searching.</div>
        ) : loading ? (
          <div className="table-loading">Searching for "{searchTerm}"...</div>
        ) : (
          <table className="patient-table">
            <thead>
              <tr>
                <th><UserRound size={16} /> Patient</th>
                <th>ID</th>
                <th>Disease</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map((patient) => (
                  <tr key={patient._id}>
                    <td>
                      <div className="patient-info">
                        <span className="name">{patient.fullName}</span>
                        <span className="email">{patient.email}</span>
                      </div>
                    </td>
                    <td><span className="id-badge">{patient.patientID}</span></td>
                    <td>{patient.disease}</td>
                    <td>{patient.doctorAssigned}</td>
                    <td>
                      <span className={`status-badge ${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="icon-btn edit" onClick={() => navigate(`/update/${patient._id}`)}><Edit2 size={16} /></button>
                        <button className="icon-btn delete" onClick={() => handleDelete(patient._id)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No patients found matching "{searchTerm}".</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SearchPatient;
