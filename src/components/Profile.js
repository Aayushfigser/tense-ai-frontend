import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { getUserProfile } from '../api/userService';
import '../styles/Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);  // Initialize state for user data
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        getUserProfile(token).then(setUserData);
    }, []);


    return (
        <div className="profile-container">
            <div className="profile-box">
                <div className="profile-avatar">
                    <div className="avatar-circle">
                        {userData ? userData.name.charAt(0).toUpperCase() : 'Loading...'}
                    </div>
                    <div className="profile-info">
                        <p>{userData ? userData.email : 'Loading...'}</p>  
                        <h2>{userData ? "Hi " + userData.name.split(" ")[0] : 'Loading...'}</h2> 
                    </div>
                </div> 
               { <Button variant="contained" className="profile-button" onClick={handleManageAccount}>
                    Manage your Account
                </Button>} <br></br>
                
                
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

