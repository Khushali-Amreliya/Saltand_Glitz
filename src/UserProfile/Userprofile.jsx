// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Uprofile from './Uprofile';

// const Userprofile = () => {
//     const [user, setUser] = useState({});

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser)); // Load user data into state
//         }
//     }, []);

//     return (
//         <div className='profile-container'>
//             <div className='container-fluid'>
//                 <div className='row'>
//                     <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 m-0 p-0'>
//                         <Uprofile />
//                     </div>
//                     <div className='col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 m-0 p-0 bg_up'>
//                         <div className='profile-details-card'>
//                             <div className='row profile_title align-items-center'>
//                                 <div className='col-6'>
//                                     <h2 className='mt-2'>Your Profile</h2>
//                                 </div>
//                                 <div className='col-6'>
//                                     <button className='btn float-end'>
//                                         <Link to="/edit-profile" className="text-dark text-decoration-none">Edit Profile</Link>
//                                     </button>
//                                 </div>
//                             </div>
//                             <table className="table table_up">
//                                 <tbody>
//                                     <tr>
//                                         <th style={{ width: "35%" }}>NAME:</th>
//                                         <td>{user?.name || '-'}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>EMAIL:</th>
//                                         <td>{user?.email || '-'}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>MOBILE NO.:</th>
//                                         <td>{user?.mobile || '-'}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>PINCODE:</th>
//                                         <td>{user?.pincode || '-'}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>BIRTHDAY:</th>
//                                         <td>{user?.birthday || '-'}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>ANNIVERSARY:</th>
//                                         <td>{user?.anniversary || '-'}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>OCCUPATION:</th>
//                                         <td>{user?.occupation || '-'}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>SPOUSE BIRTHDAY:</th>
//                                         <td>{user?.spouseBirthday || '-'}</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Userprofile;




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Uprofile from './Uprofile';

const Userprofile = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        // Fetch user profile from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []); // This will only run on component mount

    return (
        <div className=''>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 m-0 p-0'>
                        <Uprofile />
                    </div>
                    <div className='col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 m-0 p-0 bg_up'>
                        <div className='profile-details-card'>
                            <div className='row profile_title align-items-center'>
                                <div className='col-6'>
                                    <h2 className='mt-2'>Your Profile</h2>
                                </div>
                                <div className='col-6'>
                                    <button className='btn float-end'>
                                        <Link to="/edit-profile" className="text-dark text-decoration-none">Edit Profile</Link>
                                    </button>
                                </div>
                            </div>
                            <table className="table table_up">
                                <tbody>
                                    <tr>
                                        <th style={{ width: "35%" }}>NAME:</th>
                                        <td>{(user?.firstName || '-') + ' ' + (user?.lastName || '')}</td>
                                    </tr>
                                    <tr>
                                        <th>EMAIL:</th>
                                        <td>{user?.email || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>MOBILE NO.:</th>
                                        <td>{user?.mobileNumber || '-'}</td>
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
