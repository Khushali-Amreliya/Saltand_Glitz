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

        // Simple validation
        if (!formData.name || !formData.email || !formData.mobile) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Assuming mobile number should be numeric and 10 digits
        if (!/^\d{10}$/.test(formData.mobile)) {
            toast.error('Mobile number must be 10 digits');
            return;
        }

        localStorage.setItem('user', JSON.stringify(formData)); // Update localStorage
        toast.success('Profile updated successfully');
        navigate('/Userprofile'); // Redirect to profile page after update
    };

    // Function to handle cancel action
    const handleCancel = () => {
        navigate('/Userprofile'); // Redirect to profile page or previous page
    };

    // Calculate profile completion percentage
  

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 m-0 p-0'>
                        <Uprofile />
                    </div>
                    <div className='col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 edit-profile mx-auto d-block'>
                        <div className='edit-profile-container py-5'>
                            <form onSubmit={handleSubmit}>
                                <div className="form__div">
                                    <input
                                        type='text'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className='form__input'
                                        placeholder=' '
                                        required // Make field required
                                    />
                                    <label className='form__label'>Name</label>
                                </div>
                                <div className="form__div">
                                    <input
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className='form__input'
                                        placeholder=' '
                                        required // Make field required
                                    />
                                    <label className='form__label'>Email</label>
                                </div>
                                <div className="form__div">
                                    <input
                                        type='text'
                                        name='mobile'
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        className='form__input'
                                        placeholder=' '
                                    />
                                    <label className='form__label'>Mobile</label>
                                </div>
                                <div className="form__div">
                                    <input
                                        type='text'
                                        name='pincode'
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className='form__input'
                                        placeholder=' '
                                    />
                                    <label className='form__label'>Pincode</label>
                                </div>
                                <div className="form__div">
                                    <input
                                        type='date'
                                        name='birthday'
                                        value={formData.birthday}
                                        onChange={handleInputChange}
                                        className='form__input'
                                        placeholder=' '
                                    />
                                    <label className='form__label'>Birthday</label>
                                </div>
                                <div className="form__div">
                                    <input
                                        type='date'
                                        name='anniversary'
                                        value={formData.anniversary}
                                        onChange={handleInputChange}
                                        className='form__input'
                                        placeholder=' '
                                    />
                                    <label className='form__label'>Anniversary</label>
                                </div>
                                <div className="form__div">
                                    <input
                                        type='text'
                                        name='occupation'
                                        value={formData.occupation}
                                        onChange={handleInputChange}
                                        className='form__input'
                                        placeholder=' '
                                    />
                                    <label className='form__label'>Occupation</label>
                                </div>
                                <div className="form__div">
                                    <input
                                        type='date'
                                        name='spouseBirthday'
                                        value={formData.spouseBirthday}
                                        onChange={handleInputChange}
                                        className='form__input'
                                        placeholder=' '
                                    />
                                    <label className='form__label'>Spouse Birthday</label>
                                </div>
                                <button type='button' className='btn form__button_cancel' onClick={handleCancel}>Cancel</button>
                                <button type='submit' className='form__button'>Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
