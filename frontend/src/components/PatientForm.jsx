import React, { useState, useEffect } from 'react';
import { Save, X, User, Phone, Mail, Calendar, UserRound, Stethoscope, DoorOpen, BadgeCheck, Activity } from 'lucide-react';

const PatientForm = ({ initialData, onSubmit, onCancel, loading, title, buttonText }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    disease: '',
    doctorAssigned: '',
    roomNumber: '',
    patientType: 'Outpatient',
    status: 'Admitted'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="registration-form glass-card" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{title}</h2>
        <p>Please ensure all information is accurate and up to date.</p>
      </div>

      <div className="form-grid">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="input-field">
            <label><User size={16} /> Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Doe" />
          </div>
          <div className="input-row">
            <div className="input-field">
              <label><Mail size={16} /> Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
            </div>
            <div className="input-field">
              <label><Phone size={16} /> Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 234 567 890" />
            </div>
          </div>
          <div className="input-row">
            <div className="input-field">
              <label><Calendar size={16} /> Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="25" min="0" />
            </div>
            <div className="input-field">
              <label><UserRound size={16} /> Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Medical Information</h3>
          <div className="input-field">
            <label><Stethoscope size={16} /> Disease / Diagnosis</label>
            <input type="text" name="disease" value={formData.disease} onChange={handleChange} required placeholder="e.g. Fever, Fracture" />
          </div>
          <div className="input-field">
            <label><User size={16} /> Doctor Assigned</label>
            <input type="text" name="doctorAssigned" value={formData.doctorAssigned} onChange={handleChange} required placeholder="Dr. Smith" />
          </div>
          <div className="input-row">
            <div className="input-field">
              <label><DoorOpen size={16} /> Room Number</label>
              <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required placeholder="101-A" />
            </div>
            <div className="input-field">
              <label><BadgeCheck size={16} /> Patient Type</label>
              <select name="patientType" value={formData.patientType} onChange={handleChange}>
                <option value="Inpatient">Inpatient</option>
                <option value="Outpatient">Outpatient</option>
              </select>
            </div>
          </div>
          <div className="input-field">
            <label><Activity size={16} /> Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Admitted">Admitted</option>
              <option value="Discharged">Discharged</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <X size={18} /> Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          <Save size={18} /> {loading ? 'Saving...' : buttonText}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
