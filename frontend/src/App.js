// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';

function App() {
  const location = useLocation(); // Get the current location

  return (
    <div className="App">
      {/* Conditionally render Navbar based on the current route */}
      {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}
      <div className="content">
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Check if user is authenticated and admin before rendering admin-only routes */}
          {UserService.adminOnly() && (
            <>
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/admin/user-management" element={<UserManagementPage />} />
              <Route path="/update-user/:userId" element={<UpdateUser />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

// Wrap App component with BrowserRouter
const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
