import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Uprofile from './Uprofile';

const Userprofile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className='profile-container'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-2 col-md-6 m-0 p-0'>
                        <Uprofile />
                    </div>
                    <div className='col-lg-10 col-md-6 m-0 p-0 bg_up'>
                        <div className='profile-details-card'>
                            <div className='row profile_title align-items-center'>
                                <div className='col-6'>
                                    <h2 className='mt-2'>Your Profile </h2>
                                </div>
                                <div className='col-6'>
                                    <button className='btn float-end'><Link to="/edit-profile" className="text-dark text-decoration-none ">Edit Profile</Link></button>
                                </div>
                            </div>
                            <table className="table table_up">
                                <tbody>
                                    <tr>
                                        <th style={{ width: "35%" }}>NAME:</th>
                                        <td>{user?.name || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>EMAIL:</th>
                                        <td>{user?.email || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>MOBILE NO.:</th>
                                        <td>{user?.mobile || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>PINCODE:</th>
                                        <td>{user?.pincode || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>BIRTHDAY:</th>
                                        <td>{user?.birthday || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>ANNIVERSARY:</th>
                                        <td>{user?.anniversary || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>OCCUPATION:</th>
                                        <td>{user?.occupation || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>SPOUSE BIRTHDAY:</th>
                                        <td>{user?.spouseBirthday || '-'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Userprofile;
