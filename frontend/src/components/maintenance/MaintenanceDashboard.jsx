import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserService from '../service/UserService';
import './MaintenanceDashboard.css';

function MaintenanceDashboard() {
    const [requests, setRequests] = useState([]);
    const [profileInfo, setProfileInfo] = useState({});
    const navigate = useNavigate();
    const isAdmin = UserService.isAdmin();

    const fetchProfileInfo = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const profileResponse = await UserService.getYourProfile(token);
            setProfileInfo(profileResponse.ourUsers);
            
            if (isAdmin) {
                const response = await axios.get(
                    'http://localhost:8080/api/maintenance/requests/all',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setRequests(response.data);
            } else {
                const response = await axios.get(
                    `http://localhost:8080/api/maintenance/requests/${profileResponse.ourUsers.universityId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setRequests(response.data);
            }
        } catch (error) {
            console.error('Error fetching information:', error);
        }
    }, [isAdmin]);

    useEffect(() => {
        fetchProfileInfo();
    }, [fetchProfileInfo]);

    const handleDelete = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `http://localhost:8080/api/maintenance/request/${requestId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchProfileInfo(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    return (
        <div className="maintenance-dashboard">
            <h2>Hello {profileInfo.name}</h2>
            <h2>Maintenance Request Dashboard {isAdmin && '(Admin View)'}</h2>
            <button className="btn btn-success" onClick={() => navigate('/maintenance/new')}>
                Create New Request
            </button>
            <div className="requests-table">
                <table>
                    <thead>
                        <tr>
                            <th>Request Type</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Requested Date/Time</th>
                            {isAdmin && <th>Requested By</th>}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.requestType}</td>
                                <td>{request.location}</td>
                                <td>{request.description}</td>
                                <td>{new Date(request.requestedDateTime).toLocaleString()}</td>
                                {isAdmin && <td>{request.universityId}</td>}
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(request.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MaintenanceDashboard; 