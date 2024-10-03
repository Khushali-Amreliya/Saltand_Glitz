import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EmptyState from '../Pages/EmptyState';
import { cartAction } from '../Store/Slice/CartSlice';
import { formatCurrency } from '../Utils/formateCurrency';
import Aos from 'aos';
import "aos/dist/aos.css";
import axios from 'axios';
import { Link } from 'react-router-dom';


function Uwishlist() {
    const wishlistItem = useSelector(state => state.cart.wishlistItem);
    const dispatch = useDispatch();

    // Remove from wishlist
    const handleRemove = (id) => {
        dispatch(cartAction.removeFromWishlist(id));
    };

    // Add to cart and remove from wishlist
    const handleMoveToCart = async (item) => {
        const cartItem = {
            id: item.id,
            title: item.title,
            price: item.price,
            image01: item.image01,
            totalprice: item.totalprice
        };

        try {
            const response = await axios.post('http://localhost:5000/v1/carts/add', cartItem);

            if (response.status === 201) {

                dispatch(cartAction.addItem(response.data));

            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            // setLoading(false);
        }
        dispatch(cartAction.removeFromWishlist(item.id));
    };

    useEffect(() => {
        Aos.init();
    }, []);
    return (

        <div>
            <div className='container-fluid px-3'>
                <div className='row'>
                    <div className='col-lg-2'>
                        <div className="sidebar-wrapper">
                            <div className="sidebar" id="sidebar">
                                <ul>
                                    <div className="profile">
                                        <img src="https://i.pinimg.com/originals/6d/1f/20/6d1f2038bcf52a4cc496489fcd2139a6.jpg" alt="profile pic" />
                                        <span>Username</span>
                                    </div>

                                    <div className="indicator" id="indicator"></div>
                                    <li><Link to="/profile"><i className="icon"></i><span>Home</span></Link></li>
                                    <li><Link to="/u-order"><i className="icon"></i><span>Order</span></Link></li>
                                    <li><Link><i className="icon"></i><span>Edit Profile</span></Link></li>
                                    <li><Link to="/u-wishlist"><i className="icon"></i><span>Wishlist</span></Link></li>
                                    <li><Link ><i className="icon"></i><span >Logout</span></Link></li>
                                </ul>
                            </div>
                            {/* <button className="toggle-btn" id="toggleBtn">
                                <i className="fa-solid fa-chevron-right"></i>
                            </button> */}
                        </div>
                    </div>
                    <div className='col-lg-10'>
                        <div className='py-3'>
                            {
                                wishlistItem.length > 0 ? (
                                    <section className='wishlist-items'>
                                        <div className='row'>
                                            {
                                                wishlistItem.map((item) => (
                                                    <div key={item.id} className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6' data-aos="zoom-in-up" data-aos-duration="2000">
                                                        <div className='card border-0'>
                                                            <img alt={item.title} src={item.image01} className='position-relative'></img>
                                                            <div className='card-body d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <p className='m-0'>{formatCurrency(item.price)}</p>
                                                                    <h6 className='d-inline-block'>{item.title}</h6>
                                                                </div>
                                                                <i className='ri-shopping-cart-2-fill align-middle wishlist_cart'
                                                                    onClick={() => handleMoveToCart(item)}>
                                                                </i>
                                                                <i className='ri-close-line wishlist_close_icon'
                                                                    onClick={() => handleRemove(item.id)}>
                                                                </i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </section>
                                ) : (
                                    <EmptyState />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Uwishlist