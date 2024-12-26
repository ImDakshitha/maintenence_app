import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function RequestForm() {
    const [request, setRequest] = useState({ type: '', location: '', description: '', role: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRequest({ ...request, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const userId = String(decodedToken.sub);
            console.log("ID", userId);

            const requestToSend = {
                type: request.type,
                location: request.location,
                description: request.description,
                requestedById: userId,
                approvalStatus: 'PENDING',
                status: 'OPEN',
                role: request.role
            };

            await axios.post('http://localhost:8080/api/requests', requestToSend, {
                headers: { Authorization: `${token}` },
            });
            alert('Request submitted successfully!');
            navigate('/dashboard');
        } catch (error) {
            alert('Failed to submit the request.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Submit a New Request</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Request Type</label>
                    <select
                        id="type"
                        name="type"
                        className="form-select"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select...</option>
                        <option value="MAINTENANCE">Maintenance</option>
                        <option value="WORK">Work</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <select
                        id="location"
                        name="location"
                        className="form-select"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Location</option>
                        <option value="Memorial and Administrative Building">Memorial and Administrative Building</option>
                        <option value="Multipurpose Building">Multipurpose Building</option>
                        <option value="Pump House">Pump House</option>
                        <option value="Bahisjyagaraya Building">Bahisjyagaraya Building</option>
                        <option value="Green House">Green House</option>
                        <option value="Main Vehicle Park">Main Vehicle Park</option>
                        <option value="Canteen Kitchen Building">Canteen Kitchen Building</option>
                        <option value="Faculty of Graduate Studies/Department of Chikithsa Building">Faculty of Graduate Studies/Department of Chikithsa Building</option>
                        <option value="New Electrical Building">New Electrical Building</option>
                        <option value="Laboratory Complex">Laboratory Complex</option>
                        <option value="Lecture Hall Complex">Lecture Hall Complex</option>
                        <option value="Reading Hall">Reading Hall</option>
                        <option value="Maintenance Building">Maintenance Building</option>
                        <option value="Main Stores and Shalya Shalakya">Main Stores and Shalya Shalakya</option>
                        <option value="Main Security Office">Main Security Office</option>
                        <option value="Generator Building">Generator Building</option>
                        <option value="Staff Motorcycle Park">Staff Motorcycle Park</option>
                        <option value="Staff Three-Wheel Park">Staff Three-Wheel Park</option>
                        <option value="Transformer Building">Transformer Building</option>
                        <option value="Library Building">Library Building</option>
                        <option value="Students Center">Students Center</option>
                        <option value="New Academic Building">New Academic Building</option>
                        <option value="New Administrative Building">New Administrative Building</option>
                        <option value="Garbage Stores">Garbage Stores</option>
                        <option value="Students Motorcycle Park">Students Motorcycle Park</option>
                        <option value="Gymnasium">Gymnasium</option>
                        <option value="Ladies Hostel">Ladies Hostel</option>
                        <option value="Quarters 1">Quarters 1</option>
                        <option value="Quarters 2">Quarters 2</option>
                        <option value="Quarters 3">Quarters 3</option>
                        <option value="Quarters 4">Quarters 4</option>
                        <option value="Quarters 5">Quarters 5</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        id="role"
                        name="role"
                        className="form-select"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="ADMIN">Admin</option>
                        <option value="MANAGER">Manager</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="4"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default RequestForm;
