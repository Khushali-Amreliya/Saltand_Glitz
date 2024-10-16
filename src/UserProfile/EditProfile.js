import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Uprofile from './Uprofile';

const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        pincode: '',
        birthday: '',
        anniversary: '',
        occupation: '',
        spouseBirthday: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setFormData(JSON.parse(storedUser)); // Load user data into form
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(formData)); // Update localStorage
        toast.success('Profile updated successfully');
        navigate('/Userprofile'); // Redirect to profile page after update
    };

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-2 col-md-2 m-0 p-0'>
                        <div>
                            <Uprofile />
                        </div>
                    </div>
                    <div className='col-lg-10 col-md-10'>
                    <div className='edit-profile-container'>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Name:</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Mobile:</label>
                        <input
                            type='text'
                            name='mobile'
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Pincode:</label>
                        <input
                            type='text'
                            name='pincode'
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Birthday:</label>
                        <input
                            type='date'
                            name='birthday'
                            value={formData.birthday}
                            onChange={handleInputChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Anniversary:</label>
                        <input
                            type='date'
                            name='anniversary'
                            value={formData.anniversary}
                            onChange={handleInputChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Occupation:</label>
                        <input
                            type='text'
                            name='occupation'
                            value={formData.occupation}
                            onChange={handleInputChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Spouse Birthday:</label>
                        <input
                            type='date'
                            name='spouseBirthday'
                            value={formData.spouseBirthday}
                            onChange={handleInputChange}
                            className='form-control'
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Save Changes</button>
                </form>
            </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default EditProfile;
