// import React, { useRef, useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import Slider from 'react-slick';
// import { cartAction } from '../../Store/Slice/CartSlice';
// import Loader from '../Loader';
// import { formatCurrency } from '../../Utils/formateCurrency';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import products from '../../fakedata/Product';

// const ProductCard = ({ Productsitem }) => {
//     const [loading, setLoading] = useState(false);
//     const { id, title, price, image01, image02, image03 } = Productsitem;
//     const dispatch = useDispatch();
//     const slider = useRef(null);
//     const navigate = useNavigate();
//     const [isHeartFilled, setIsHeartFilled] = useState(false);
//     const similar = React.useRef(null);

//     const wishlist = useSelector((state) => state.cart.wishlistItem);

//     useEffect(() => {
//         // Check if the item is already in the wishlist
//         const itemInWishlist = wishlist.find(item => item.id === id);
//         setIsHeartFilled(!!itemInWishlist);
//     }, [wishlist, id]);

//     const handleHeartClick = async () => {
//         if (isHeartFilled) {
//             try {
//                 // Call the API to remove the item from the wishlist
//                 await axios.post(`https://saltandglitz-api.vercel.app/v1/wishlist/remove-wishlist/${id}`);
//                 dispatch(cartAction.removeFromWishlist(id));
//                 toast.success("Item removed from wishlist", {
//                     position: "top-center",
//                     autoClose: 1000,
//                 });
//             } catch (error) {
//                 console.error('Error removing item from wishlist:', error);
//                 toast.error("Error removing item from wishlist", {
//                     position: "top-center",
//                     autoClose: 1000,
//                 });
//             }
//         } else {
//             try {
//                 // Call the API to add the item to the wishlist
//                 await axios.post('https://saltandglitz-api.vercel.app/v1/wishlist/create-wishlist', {
//                     id,
//                     title,
//                     price,
//                     image01
//                 });
//                 dispatch(cartAction.addToWishlist({ id, title, price, image01 }));
//                 toast.success("Item added to wishlist", {
//                     position: "top-center",
//                     autoClose: 1000,
//                 });
//             } catch (error) {
//                 console.error('Error adding item to wishlist:', error);
//                 toast.error("Error adding item to wishlist", {
//                     position: "top-center",
//                     autoClose: 1000,
//                 });
//             }
//         }
//         setIsHeartFilled(!isHeartFilled);
//     };

//     const addToCart = async () => {
//         setLoading(true);
//         toast.success("Product added to cart successfully!", {
//             position: "top-center",
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });

//         const cartItem = { id, title, price, image01 };
//         try {
//             const response = await axios.post('https://saltandglitz-api.vercel.app/v1/carts/add', cartItem);

//             if (response.status === 201) {
//                 dispatch(cartAction.addItem(response.data));
//             }
//         } catch (error) {
//             console.error('Error adding item to cart:', error);
//         }
//         setTimeout(() => {
//             setLoading(false);
//             navigate('/cart');
//         }, 1000);
//     };

//     const handleVideoCallClick = () => {
//         const phoneNumber = '7624046215'; // Replace with your actual phone number
//         const message = `Hi, I'm interested in trying on the jewelry via video call: ${title} with ID: ${id}. Can we schedule a call?`;
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//         // Redirecting to WhatsApp Web with the predefined message
//         window.open(whatsappUrl, '_blank');
//     };

//     const settings2 = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: true,
//     };

//     const view_similar = {
//         dots: false,
//         infinite: true,
//         speed: 1000,
//         slidesToShow: 5,
//         slidesToScroll: 1,
//         arrows: true,
//         responsive: [
//             {
//                 breakpoint: 480, // mobile
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 768, // tablet
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 1024, // small desktop
//                 settings: {
//                     slidesToShow: 4,
//                     slidesToScroll: 2,
//                 },
//             }
//         ],
//     };
//     return (
//         <>
//             {loading && <Loader />}
//             <div className='card border-0'>
//                 <Link to={`/productDetail/${id}`}>
//                     <Slider ref={slider} {...settings2} className='border border-1' style={{ borderRadius: "10px" }}  >
//                         <img alt='' src={image01} className='img-fluid' />
//                         <img alt='' src={image02} className='img-fluid' />
//                         <img alt='' src={image03} className='img-fluid' />
//                     </Slider>
//                 </Link>
//                 <div className="card-body relative">
//                     <p className="m-0">{formatCurrency(price)}</p>
//                     <h6>{title}</h6>

//                     <div className="d-flex align-items-center">
//                         <i
//                             className={`ri-heart-line absolute_heart fs-4 heart-icon ${isHeartFilled ? 'd-none' : ''}`}
//                             onClick={handleHeartClick}
//                         ></i>
//                         <i
//                             className={`ri-heart-fill absolute_heart fs-4 heart-icon ${isHeartFilled ? '' : 'd-none'}`}
//                             onClick={handleHeartClick}
//                         ></i>

//                         {/* "View Similar" Button */}
//                         <img
//                             alt="view_similar"
//                             src="assets/img/view_similar.png"
//                             className="img-fluid view-similar-btn"
//                             data-bs-toggle="offcanvas" data-bs-target="#viewSimilar" aria-controls="viewSimilar"
//                             style={{ cursor: 'pointer' }} // Adds pointer cursor to image
//                         />
//                     </div>

//                     <p className="absolute_latest btn">LATEST</p>

//                     {/* <button className="heart-icon1 btn add_to_btn" onClick={addToCart}>
//                         <span className="fw-bold">ADD TO CART&nbsp;</span>
//                     </button>

//                     <button
//                         className="mx-auto d-block video_call_btn btn rounded-pill float-end"
//                         onClick={handleVideoCallClick}>
//                         <i className="ri-video-on-fill text-light text-center"></i>
//                     </button> */}

//                     <button onClick={() => slider?.current?.slickPrev()} className="prev_btn absolute_prev_btn d-lg-block d-none">
//                         <i className="ri-arrow-left-wide-line"></i>
//                     </button>
//                     <button onClick={() => slider?.current?.slickNext()} className="next_btn absolute_next_btn d-lg-block d-none">
//                         <i className="ri-arrow-right-wide-line"></i>
//                     </button>

//                     {/* offcanvas */}
//                     <div className="offcanvas offcanvas-bottom off_bottom" data-bs-backdrop="true" tabIndex="-1" id="viewSimilar" aria-labelledby="offcanvasViewSimilar">
//                         <div className="offcanvas-header">
//                             <h5 className="offcanvas-title off_title" id="offcanvasViewSimilar">Similar Designs</h5>
//                             <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                         </div>
//                         <div className="offcanvas-body m-0 p-0">
//                             <div className='row position-relative'>
//                                 <div className=''>
//                                     <button onClick={() => similar?.current?.slickPrev()} className='pre-btn-set'><i className="ri-arrow-left-wide-line"></i></button>
//                                 </div>
//                                 <div className=''>
//                                     <Slider ref={similar} {...view_similar}>
//                                         {products.map((item) => (
//                                             <div className='card border-0 w-100 mx-auto d-block' key={item.id}>
//                                                 <Link to={`/productDetail/${item.id}`}>
//                                                     <img alt={item.title} src={item.image01} className='img-fluid px-2 position-relative' />
//                                                 </Link>
//                                                 <div className='card-body cartlane'>
//                                                     <h6>
//                                                         {formatCurrency(item.price)} <span><del>{formatCurrency(item.delprice)}</del></span>
//                                                     </h6>
//                                                     <p>{item.title}</p>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </Slider>
//                                 </div>
//                                 <div className=''>
//                                     <button onClick={() => similar?.current?.slickNext()} className="next-btn-set float-end "><i className="ri-arrow-right-wide-line"></i></button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ProductCard;

import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../Utils/formateCurrency'; // Utility for formatting currency
import { cartAction } from '../../Store/Slice/CartSlice'; // Redux actions for managing cart and wishlist

const ProductCard = ({ Productsitem }) => {
    const user = JSON.parse(localStorage.getItem('user')); // Get the logged-in user's data from localStorage
    const { product_id, title, total14KT, image01, image02, image03, video } = Productsitem; // Destructure product details
    const slider = useRef(null); // Ref for the slider
    const dispatch = useDispatch(); // Redux dispatch
    const [isWishlist, setIsWishlist] = useState(false);

    // Update the heart icon based on the Redux wishlist state
    useEffect(() => {
        // Get wishlist from localStorage
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const itemInWishlist = savedWishlist.find((item) => item.product_id === product_id);
        setIsWishlist(!!itemInWishlist); // Updates heart state based on persisted wishlist
    }, [product_id]);

    // Function to add an item to the wishlist
    const addToWishlist = async () => {
        try {
            await axios.post('https://saltandglitz-api.vercel.app/v1/wishlist/create_wishlist', {
                userId: user._id,
                productId: product_id,
            });

            dispatch(cartAction.addToWishlist(Productsitem));
            toast.success('Item added to wishlist', {
                position: 'top-center',
                autoClose: 1000,
            });
            setIsWishlist(true); // Set heart to fill
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            toast.error('Error adding item to wishlist', {
                position: 'top-center',
                autoClose: 1000,
            });
        }
    };

    const removeFromWishlist = async () => {
        try {
            await axios.delete(
                `https://saltandglitz-api.vercel.app/v1/wishlist/remove_wishlist/${user._id}/${product_id}`
            );

            dispatch(cartAction.removeFromWishlist(product_id));
            toast.success('Item removed from wishlist', {
                position: 'top-center',
                autoClose: 1000,
            });
            setIsWishlist(false); // Set heart to unfill
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            toast.error('Error removing item from wishlist', {
                position: 'top-center',
                autoClose: 1000,
            });
        }
    };

    const handleWishlistToggle = () => {
        if (isWishlist) {
            removeFromWishlist();
        } else {
            addToWishlist();
        }
    };

    // Settings for the image and video slider
    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="card-container position-relative">
            <div>
                <Link to={`/Productdetails/${product_id}`}>
                    {/* Slider for product images and video */}
                    <Slider ref={slider} {...settings2} className="border border-1">
                        <img alt="" src={image01} className="img-fluid" />
                        <img alt="" src={image02} className="img-fluid" />
                        <img alt="" src={image03} className="img-fluid" />
                        <video controls autoPlay className="img-fluid" style={{ width: "100%" }}>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Slider>
                </Link>

                {/* Hover Content for large screens */}
                <div className="card-body p-0 d-lg-block d-none">
                    <div className="hover-details position-absolute w-100">
                        <p className="m-0">{formatCurrency(total14KT)}</p>
                        <h6>{title}</h6>
                    </div>

                    {/* Slider navigation buttons */}
                    <div>
                        <button onClick={() => slider?.current?.slickPrev()} className="absolute_prev_btn d-lg-block d-none">
                            <i className="ri-arrow-left-wide-line"></i>
                        </button>
                        <button onClick={() => slider?.current?.slickNext()} className="absolute_next_btn d-lg-block d-none">
                            <i className="ri-arrow-right-wide-line"></i>
                        </button>
                    </div>

                    {/* Wishlist Heart Icon */}
                    <div className="wishlist-icons position-absolute top-0 end-0 p-2">
                        <i
                            className={`fs-4 heart-icon ${isWishlist ? 'ri-heart-fill text-dark' : 'ri-heart-line'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={handleWishlistToggle}
                        ></i>
                    </div>
                </div>

                {/* Mobile view content */}
                <div className="card-body p-0 d-lg-none d-md-block">
                    <div>
                        <p className="m-0">{formatCurrency(total14KT)}</p>
                        <h6>{title}</h6>
                    </div>

                    {/* Slider navigation buttons for mobile */}
                    <div>
                        <button onClick={() => slider?.current?.slickPrev()} className="absolute_prev_btn d-lg-none d-block">
                            <i className="ri-arrow-left-wide-line"></i>
                        </button>
                        <button onClick={() => slider?.current?.slickNext()} className="absolute_next_btn d-lg-none d-block">
                            <i className="ri-arrow-right-wide-line"></i>
                        </button>
                    </div>

                    {/* Wishlist Heart Icon for mobile */}
                    <div className="d-flex align-items-center color_md">
                        <i
                            className={`fs-4 absolute_heart heart-icon ${isWishlist ? 'ri-heart-fill text-dark' : 'ri-heart-line'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={handleWishlistToggle}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
