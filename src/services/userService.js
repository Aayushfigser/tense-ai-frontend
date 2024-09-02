import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to update user profile
export const updateUserProfile = async (profileData) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const { data } = await axios.put(`${API_URL}/users/profile`, profileData, config);
    return data;
};
