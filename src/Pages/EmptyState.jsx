import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const EmptyState = () => {
    const [loading, setLoading] = useState(false); // Manage loader state
    const navigate = useNavigate();

    const handleStartShopping = () => {
        setLoading(true); // Show loader
        setTimeout(() => {
            setLoading(false);
            navigate('/'); // Redirect after 1 second
        }, 1000); // Adjust the delay as needed
    };

    return (
        <>
            {loading && <Loader />} {/* Show loader when loading is true */}
            {!loading && ( // Show content when not loading
                <div className="empty-state-container">
                    <div className="image-container">
                        {/* Placeholder for the illustration */}
                        <i className="ri-shopping-cart-fill" style={{ fontSize: "80px" }}></i>
                    </div>
                    <h1 className="title p-0 m-0">There is nothing here!</h1>
                    <p className="subtitle">Let's do some retail therapy.</p>
                    <div className='d-lg-block d-none'>
                        <button className="start-button" onClick={handleStartShopping}>
                            START SHOPPING
                        </button>
                    </div>

                    <div className="footer">
                        <div className="footer-item">
                            <img src="assets/img/delivery.png" alt="BIS" className="img-fluid " />
                            <p>BIS 100% Hallmarked Jewellery</p>
                        </div>
                        <div className="footer-item">
                            <img src="assets/img/pdp-delivery-tah-sprite (3).png" alt="Tanishq" className="img-fluid " />
                            <p>Trust of Tanishq Titan Privileges</p>
                        </div>
                        <div className="footer-item">
                            <img src="assets/img/pdp-delivery-tah-sprite (2).png" alt="Caratlane" className="img-fluid " />
                            <p>100% Certified by Caratlane</p>
                        </div>
                    </div>
                    <div className='d-lg-none d-block filter_midium_divice w-100 py-2'>
                        <button className="btn start_btn_md text-dark fw-bold" onClick={handleStartShopping}>
                            START SHOPPING
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmptyState;
