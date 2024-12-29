// components/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import './UserManagementPage.css';

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getAllUsers(token);
      setUsers(response.ourUsersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      const token = localStorage.getItem('token');
      
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-management-container">
        <div className="page-header">
            <h2>USER MANAGEMENT DASHBOARD</h2>
            <Link to="/register" className="btn btn-primary btn-sm">
                + Add New User
            </Link>
        </div>

        <div className="table-container">
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>University ID</th>
                        <th>Position</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.universityId}</td>
                            <td>{user.position}</td>
                            <td>
                                <span className={`role-badge role-${user.role.toLowerCase()}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <Link 
                                        to={`/update-user/${user.id}`} 
                                        className="btn btn-primary btn-sm"
                                    >
                                        Update
                                    </Link>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default UserManagementPage;
