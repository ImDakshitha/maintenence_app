import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserService from '../service/UserService';
import './MaintenanceDashboard.css';

function MaintenanceDashboard() {
    const [requests, setRequests] = useState([]);
    const [profileInfo, setProfileInfo] = useState({});
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        fetchProfileInfo();
    }, []);



    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const profileresponse = await UserService.getYourProfile(token);
            setProfileInfo(profileresponse.ourUsers);
            console.log(profileresponse.ourUsers.universityId);
            const universityId = profileresponse.ourUsers.universityId;
            const response = await axios.get(
                `http://localhost:8080/api/maintenance/requests/${universityId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const fetchRequests = async (universityId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `http://localhost:8080/api/maintenance/requests/${universityId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };


    const handleDelete = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `http://localhost:8080/api/maintenance/request/${requestId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchRequests();
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    return (
        <div className="maintenance-dashboard">
            <h2>Hello {profileInfo.name}</h2>
            <h2>Maintenance Request Dashboard</h2>
            <button
                className="create-request-btn"
                onClick={() => navigate('/maintenance/new')}
            >
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
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(request.id)}
                                    >
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