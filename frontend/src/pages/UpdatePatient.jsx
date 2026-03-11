import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { patientService } from '../services/apiService';
import PatientForm from '../components/PatientForm';
import './PatientRegistration.css';

const UpdatePatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await patientService.getById(id);
        setPatientData(response.data);
      } catch (err) {
        setError('Failed to fetch patient data');
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      await patientService.update(id, formData);
      toast.success('Patient record updated!');
      navigate('/patients');
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to update patient';
      setError(msg);
      toast.error(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="loading">Loading patient details...</div>;

  return (
    <div className="registration-container">
      <div style={{width: '100%', maxWidth: '900px'}}>
        {error && <div className="error-banner">{error}</div>}
        {patientData && (
          <PatientForm 
            title={`Update Patient: ${patientData.fullName}`} 
            buttonText="Update Records"
            initialData={patientData}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/patients')}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default UpdatePatient;
