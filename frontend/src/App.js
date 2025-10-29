import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    blood_group: ''
  });
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_URL}/patients`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/patients`, formData);
      setFormData({ name: '', email: '', phone: '', date_of_birth: '', blood_group: '' });
      fetchPatients();
    } catch (error) {
      console.error('Error adding patient:', error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏥 HealthHub - Patient Management</h1>
      </header>

      <div className="container">
        <div className="form-section">
          <h2>Register New Patient</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Patient'}
            </button>
          </form>
        </div>

        <div className="patients-section">
          <h2>Patient Records</h2>
          <div className="patients-list">
            {patients.map((patient) => (
              <div key={patient.id} className="patient-card">
                <h3>{patient.name}</h3>
                <p>📧 {patient.email}</p>
                <p>📞 {patient.phone}</p>
                <p>🩸 Blood Group: {patient.blood_group}</p>
                <p>🎂 DOB: {new Date(patient.date_of_birth).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;