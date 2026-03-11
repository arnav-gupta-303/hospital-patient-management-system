import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { patientService } from '../services/apiService';
import PatientForm from '../components/PatientForm';
import './PatientRegistration.css';

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      await patientService.create(formData);
      toast.success('Patient registered successfully!');
      navigate('/patients');
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to register patient';
      setError(msg);
      toast.error(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div style={{width: '100%', maxWidth: '900px'}}>
        {error && <div className="error-banner">{error}</div>}
        <PatientForm 
          title="Register New Patient" 
          buttonText="Register Patient"
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default PatientRegistration;
