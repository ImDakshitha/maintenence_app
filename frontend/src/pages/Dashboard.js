import React, { useEffect, useState } from 'react';
import axios from '../utils/axios.js';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('/requests', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRequests(response.data);
            } catch (err) {
                console.error("Error fetching requests: ", err);
                setError('Failed to fetch requests. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [navigate]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Maintenance Requests</h1>
            <button onClick={() => navigate('/request-form')} className="btn btn-primary">Add Request</button>
            <button onClick={handleLogout} className="btn btn-danger logout-button">Logout</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Requested By ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.type}</td>
                            <td>{request.location}</td>
                            <td>{request.description}</td>
                            <td>{request.requestedById}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
