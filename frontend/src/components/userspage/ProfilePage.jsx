import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="profile-page-container">
            <div className="profile-header">
                <h2>Profile Information</h2>
            </div>
            
            <div className="profile-content">
                <div className="profile-field">
                    <label>Name</label>
                    <p>{profileInfo.name}</p>
                </div>
                
                <div className="profile-field">
                    <label>University ID</label>
                    <p>{profileInfo.universityId}</p>
                </div>
                
                <div className="profile-field">
                    <label>Position</label>
                    <p>{profileInfo.position}</p>
                </div>
                
                <div className="profile-field">
                    <label>Role</label>
                    <p>{profileInfo.role}</p>
                </div>
            </div>

            {profileInfo.role === "ADMIN" && (
                <div className="profile-actions">
                    <Link 
                        to={`/update-user/${profileInfo.id}`} 
                        className="btn btn-primary btn-sm"
                    >
                        Update Profile
                    </Link>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
