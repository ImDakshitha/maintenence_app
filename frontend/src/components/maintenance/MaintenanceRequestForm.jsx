import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MaintenanceRequestForm.css';
import UserService from '../service/UserService';

const locations = [
    "Main Building",
    "Library",
    "Main Laboratory",
    "Mian Canteen",
    "Board Room",
    "Gymnasium",
    "Technolgy Building",
    "Student Hostel - Feamle",
    "Student Hostel - Male"
];

function MaintenanceRequestForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        requestType: 'WORK_REQUEST',
        location: '',
        description: '',
        requestedDateTime: '',
        universityId: ''
    });

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getYourProfile(token);
            setFormData(prevState => ({
                ...prevState,
                universityId: response.ourUsers.universityId
            }));
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:8080/api/maintenance/request',
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating request:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'universityId') return;
        
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="maintenance-form">
            <h2>Create Maintenance Request</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>University ID:</label>              
                    <input 
                        type="text" 
                        name="universityId" 
                        value={formData.universityId} 
                        readOnly 
                        disabled
                    />
                </div>                
                <div className="form-group">
                    <label>Request Type:</label>
                    <select 
                        name="requestType" 
                        value={formData.requestType}
                        onChange={handleChange}
                        required
                    >
                        <option value="WORK_REQUEST">Work Request</option>
                        <option value="MAINTENANCE_WORK_REQUEST">Maintenance Work Request</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Location:</label>
                    <select 
                        name="location" 
                        value={formData.location}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Location</option>
                        {locations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Describe the maintenance needed..."
                    />
                </div>

                <div className="form-group">
                    <label>Requested Date/Time:</label>
                    <input
                        type="datetime-local"
                        name="requestedDateTime"
                        value={formData.requestedDateTime}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success">
                    Submit Request
                </button>
            </form>
        </div>
    );
}

export default MaintenanceRequestForm; 