import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import '../styles/Profile.css';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Logic for logging out the user goes here.
        // After logout, redirect to the login page.
        navigate('/login');
    };

    const handleManageAccount = () => {
        // Redirect to the register page to manage account.
        navigate('/register');
    };

    return (
        <div className="profile-container">
            <div className="profile-box">
                <div className="profile-avatar">
                    <div className="avatar-circle">
                        <span className="initial">A</span>
                    </div>
                    <div className="profile-info">
                        <p>ayushfigser@gmail.com</p>
                        <h2>Hi, Aayush!</h2>
                    </div>
                </div>
                <Button variant="contained" className="profile-button" onClick={handleManageAccount}>
                    Manage your Account
                </Button> <br></br>
                
                <Button variant="contained" className="profile-button" onClick={handleLogout}>
                    Logout
                </Button>
                <div className="profile-footer">
                    <a href="./">Privacy Policy</a>
                    <a href="https:www.recoillife.com/">Terms of Service</a>
                </div>
            </div>
        </div>
    );
};

export default Profile;
