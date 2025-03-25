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
//                 await axios.post(`https://saltandglitz-api-131827005467.asia-south2.run.app/v1/wishlist/remove-wishlist/${id}`);
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
//                 await axios.post('https://saltandglitz-api-131827005467.asia-south2.run.app/v1/wishlist/create-wishlist', {
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
//             const response = await axios.post('https://saltandglitz-api-131827005467.asia-south2.run.app/v1/carts/add', cartItem);

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
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { formatCurrency } from '../../Utils/formateCurrency'; // Utility for formatting currency
import { IoHeart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { toast } from 'react-toastify';
import Header from '../../Components/Header';

const renderStar = (rating) => {
    const adjustedPercentage = ((rating / 5) * 100); // Adjust fill percentage
    return (
        <span
            style={{
                display: "inline-block",
                position: "relative",
                fontSize: "17px",
                verticalAlign: "middle",
                color: "#ccc", // Default gray star
            }}
        >
            ★{/* Empty gray star */}
            <span
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${adjustedPercentage}%`, // Adjusted fill percentage
                    overflow: "hidden",
                    color: "gold", // Filled star color
                    // textShadow: "0 0 3px rgba(0, 0, 0, 0.5)", // Improve visibility
                }}
            >
                ★
            </span>
        </span>
    );
};

const ProductCard = ({ Productsitem }) => {
    const user = JSON.parse(localStorage.getItem('user')); // Get the logged-in user's data from localStorage
    const { product_id, title, total14KT, goldImages, media } = Productsitem; // Destructure product details
    const slider = useRef(null); // Ref for the slider
    const [isWishlist, setIsWishlist] = useState(false);
    const [rating, setRating] = useState(0);
    let displayImages = [];

    if (goldImages && goldImages.length > 0) {
        displayImages = goldImages;
    } else if (media && media.length > 0) {
        displayImages = media.filter(item => item.type === 'goldImage').map(item => item.productAsset)
    }

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await axios.get(`https://saltandglitz-api-131827005467.asia-south2.run.app/v1/rating/getRating/${product_id}`);
                // console.log("Fetched Rating Data:", response.data);

                const { approvedRating } = response.data;

                if (approvedRating && approvedRating.length > 0) {
                    // Calculate Average Rating
                    const totalRatings = approvedRating.length;
                    const avgRating = approvedRating.reduce((sum, item) => sum + item.userRating, 0) / totalRatings;

                    setRating(avgRating.toFixed(1)); // Rounded to 1 decimal
                } else {
                    setRating(0);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.warn("Product rating not found, setting rating to 0");
                    // setProductRating(0);
                } else {
                    console.error("Error fetching rating:", error);
                    // setProductRating(0);
                }
            }
        };
        fetchRating();
    }, [product_id]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                let userId = user?._id || localStorage.getItem("guestUserId");
                console.log(userId);


                // console.log(userId, "ninjlnmod");

<<<<<<< HEAD
=======
                console.log(userId, "ninjlnmod");

>>>>>>> 4f5aee437fca63bd686ae338e87ee7d18c84eae6

                if (!userId) return; // Agar dono null hain, toh call na karein

                const response = await axios.get(`https://saltandglitz-api-131827005467.asia-south2.run.app/v1/wishlist/get_wishlist/${userId}`);
                const wishlistData = response.data.wishlist || {};
                const wishlistProductIds = (wishlistData.products || []).map(item => item.productId.product_id);

                localStorage.setItem('wishlist', JSON.stringify(wishlistProductIds));
                // console.log(wishlistProductIds);

                setIsWishlist(wishlistProductIds.includes(product_id));
            } catch (error) {
                console.error("Wishlist fetch error:", error);
            }

            // Header()
        };

        fetchWishlist();


    }, [product_id, user?._id]);

    const handleWishlistToggle = async (event) => {
        event.preventDefault(); // Page reload hone se roke

        let userId = user?._id; // Logged-in user ka ID check kare

        if (!userId) {
            // Guest user ke liye userId generate karo
            let guestUserId = localStorage.getItem("guestUserId");
            if (!guestUserId) {
                guestUserId = uuidv4();
                localStorage.setItem("guestUserId", guestUserId);
            }
            userId = guestUserId; // Guest ID ko userId ke jaisa treat karenge
        }

        const newWishlistStatus = !isWishlist; // UI ko pehle update karenge
        setIsWishlist(newWishlistStatus); // Optimistic UI Update

        try {
            if (newWishlistStatus) {
                // Add to Wishlist API
                await axios.post('https://saltandglitz-api-131827005467.asia-south2.run.app/v1/wishlist/create_wishlist', {
                    userId,
                    productId: product_id,
                });
                // toast.success("Added to Wishlist!");
            } else {
                // Remove from Wishlist API
                await axios.delete(`https://saltandglitz-api-131827005467.asia-south2.run.app/v1/wishlist/remove_wishlist/${userId}/${product_id}`);
                // toast.info("Removed from Wishlist!");
            }
        } catch (error) {
            console.error("Wishlist error:", error);
            setIsWishlist(!newWishlistStatus); // Agar error aaye to state reset karo
            toast.error("Something went wrong!");
        }
        // Header()
    };

    // Settings for the image and video slider
    const imageVideo = {
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
                    {/* Slider for product images */}
                    {displayImages?.length > 0 ? (
                        displayImages.length === 1 ? (
                            <img
                                alt="product-image"
                                src={displayImages[0]}
                                className="img-fluid border border-1 rounded-3"
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.style.display = "none";
                                    e.target.parentElement.innerHTML = `
                                    <div class='no-image-placeholder d-flex justify-content-center align-items-center border border-1 rounded-3' style='height: 200px;'>
                                        <span class='exlimation_mark'>!</span>
                                    </div>`;
                                }}
                            />
                        ) : (
                            <Slider ref={slider} {...imageVideo} className="border border-1 rounded-3">
                                {displayImages.map((img, index) => (
                                    <img
                                        key={index}
                                        alt={`product-image-${index}`}
                                        src={img}
                                        className="img-fluid"
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevent infinite loop
                                            e.target.style.display = "none";
                                            e.target.parentElement.innerHTML = `
                                            <div class='no-image-placeholder d-flex justify-content-center align-items-center border border-1 rounded-3' style='height: 200px;'>
                                                <span class='exlimation_mark'>!</span>
                                            </div>`;
                                        }}
                                    />
                                ))}
                            </Slider>
                        )
                    ) : (
                        <div className="no-image-placeholder d-flex justify-content-center align-items-center border border-1 rounded-3">
                            <span className="exlimation_mark">!</span>
                        </div>
                    )}


                </Link>

                {/* Hover Content for large screens */}
                <div className="card-body p-0 d-lg-block d-none px-1">
                    <div className="hover-details position-absolute w-100">
                        <p className="m-0">{formatCurrency(total14KT)}</p>
                        <h6>{title}</h6>
                    </div>

                    {/* Slider navigation buttons */}
                    <div>
                        <button onClick={(e) => { e.preventDefault(); slider?.current?.slickPrev(); }} className="absolute_prev_btn d-lg-block d-none">
                            <i className="ri-arrow-left-wide-line"></i>
                        </button>
                        <button onClick={(e) => { e.preventDefault(); slider?.current?.slickNext(); }} className="absolute_next_btn d-lg-block d-none">
                            <i className="ri-arrow-right-wide-line"></i>
                        </button>
                    </div>

                    {/* Wishlist Heart Icon */}
                    {/* <div className="wishlist-icons position-absolute top-0 end-0 p-2">
                        <i
                            className={`fs-5 heart-icon ${isWishlist ? 'fa-solid fa-heart text-dark' : 'fa-regular fa-heart'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={handleWishlistToggle}
                        ></i>
                    </div> */}
                    <div className="wishlist-icons position-absolute top-0 end-0 p-2" style={{ cursor: 'pointer' }} onClick={handleWishlistToggle}>
                        {isWishlist ? <IoHeart className="fs-5 heart_icon" /> : <IoMdHeartEmpty
                            className="fs-5 heart_icon"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Add to Wishlist"
                        />}
                    </div>

                    <div className="review_card position-absolute bottom-0 left-0 my-3 d-flex align-items-center">
                        <p className="m-0 pe-1">{rating}</p>
                        {renderStar(rating)}
                    </div>

                </div>

                {/* Mobile view content */}
                <div className="card-body p-0 d-lg-none d-md-block">
                    <div className='text-center pt-1'>
                        <p className="m-0">{formatCurrency(total14KT)}</p>
                        <h6>{title}</h6>
                    </div>

                    {/* Slider navigation buttons for mobile */}
                    <div>
                        <button onClick={(e) => { e.preventDefault(); slider?.current?.slickPrev(); }} className="absolute_prev_btn d-lg-none d-block">
                            <i className="ri-arrow-left-wide-line"></i>
                        </button>
                        <button onClick={(e) => { e.preventDefault(); slider?.current?.slickNext(); }} className="absolute_next_btn d-lg-none d-block">
                            <i className="ri-arrow-right-wide-line"></i>
                        </button>
                    </div>

                    {/* Wishlist Heart Icon for mobile */}
                    {/* <div className="d-flex align-items-center color_md">
                        <i
                            className={`fs-4 absolute_heart heart-icon ${isWishlist ? 'ri-heart-fill text-dark' : 'ri-heart-line'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={handleWishlistToggle}
                        ></i>
                    </div> */}
                    <div className="wishlist-icons position-absolute top-0 end-0 p-2" style={{ cursor: 'pointer' }} onClick={handleWishlistToggle}>
                        {isWishlist ? <IoHeart className="fs-5 heart_icon" /> : <IoMdHeartEmpty className="fs-5 heart_icon" />}
                    </div>
                    <div className="review_card review_card_md position-absolute left-0 my-3 d-flex align-items-center">
                        <p className="m-0 pe-1">{rating}</p>
                        {renderStar(rating)}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProductCard;


// import React, { useRef, useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { formatCurrency } from '../../Utils/formateCurrency';
// import { cartAction } from '../../Store/Slice/CartSlice';

// const ProductCard = ({ Productsitem }) => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const { product_id, title, total14KT, goldImages } = Productsitem;
//   const slider = useRef(null);
//   const dispatch = useDispatch();

//   // Local state to track if the current product is in the wishlist
//   const [isWishlist, setIsWishlist] = useState(false);

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         if (!user || !user._id) {
//           console.error('User not defined or missing _id:', user);
//           return;
//         }

//         const url = `https://saltandglitz-api-131827005467.asia-south2.run.app/v1/wishlist/get_wishlist/${user._id}`;
//         console.log('Fetching wishlist from:', url);

//         const response = await axios.get(url);
//         console.log('Wishlist response:', response.data);

//         // Extract the wishlist object
//         const wishlistData = response.data.wishlist;
//         if (!wishlistData) {
//           console.log('No wishlist data available');
//           return;
//         }

//         // Extract products array
//         const productsArray = wishlistData.products || [];
//         // Map to an array of product IDs (assuming each item is structured as { productId: { product_id: "..." } })
//         const wishlistProductIds = productsArray.map(item => item.productId.product_id);

//         console.log('Wishlist Product IDs:', wishlistProductIds);
//         setIsWishlist(wishlistProductIds.includes(product_id));
//       } catch (error) {
//         if (error.response) {
//           console.error('Error fetching wishlist:', error.response.data);
//         } else {
//           console.error('Error fetching wishlist:', error.message);
//         }
//         toast.error('Unable to fetch wishlist', {
//           position: 'bottom-center',
//           autoClose: 1000,
//         });
//       }
//     };

//     fetchWishlist();
//   }, [product_id, user]);

//   const addToWishlist = async () => {
//     try {
//       await axios.post('https://saltandglitz-api-131827005467.asia-south2.run.app/v1/wishlist/create_wishlist', {
//         userId: user._id,
//         productId: product_id,
//       });

//       dispatch(cartAction.addToWishlist(Productsitem));

//       toast.success('Item added to wishlist', {
//         position: 'bottom-center',
//         autoClose: 1000,
//       });
//       setIsWishlist(true);
//     } catch (error) {
//       if (error.response) {
//         console.error('Error adding to wishlist:', error.response.data);
//       } else {
//         console.error('Error adding to wishlist:', error.message);
//       }
//       toast.error('Error adding item to wishlist', {
//         position: 'bottom-center',
//         autoClose: 1000,
//       });
//     }
//   };

//   const removeFromWishlist = async () => {
//     try {
//       await axios.delete(`https://saltandglitz-api-131827005467.asia-south2.run.app/v1/wishlist/remove_wishlist/${user._id}/${product_id}`);

//       dispatch(cartAction.removeFromWishlist(product_id));

//       toast.success('Item removed from wishlist', {
//         position: 'bottom-center',
//         autoClose: 1000,
//       });
//       setIsWishlist(false);
//     } catch (error) {
//       if (error.response) {
//         console.error('Error removing from wishlist:', error.response.data);
//       } else {
//         console.error('Error removing from wishlist:', error.message);
//       }
//       toast.error('Error removing item from wishlist', {
//         position: 'bottom-center',
//         autoClose: 1000,
//       });
//     }
//   };

//   const handleWishlistToggle = () => {
//     if (isWishlist) {
//       removeFromWishlist();
//     } else {
//       addToWishlist();
//     }
//   };

//   const sliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   return (
//     <div className="card-container position-relative">
//       <div>
//         <Link to={`/Productdetails/${product_id}`}>
//           <Slider ref={slider} {...sliderSettings} className="border border-1 rounded-3">
//             <img alt="Product" src={goldImages[0]} className="img-fluid" />
//             <img alt="Product" src={goldImages[1]} className="img-fluid" />
//           </Slider>
//         </Link>

//         {/* Desktop View */}
//         <div className="card-body p-0 d-lg-block d-none">
//           <div className="hover-details position-absolute w-100">
//             <p className="m-0">{formatCurrency(total14KT)}</p>
//             <h6>{title}</h6>
//           </div>

//           <div>
//             <button onClick={() => slider?.current?.slickPrev()} className="absolute_prev_btn d-lg-block d-none">
//               <i className="ri-arrow-left-wide-line"></i>
//             </button>
//             <button onClick={() => slider?.current?.slickNext()} className="absolute_next_btn d-lg-block d-none">
//               <i className="ri-arrow-right-wide-line"></i>
//             </button>
//           </div>

//           <div className="wishlist-icons position-absolute top-0 end-0 p-2">
//             <i
//               className={`fs-5 heart-icon ${isWishlist ? 'fa-solid fa-heart text-dark' : 'fa-regular fa-heart'}`}
//               style={{ cursor: 'pointer' }}
//               onClick={handleWishlistToggle}
//             ></i>
//           </div>
//           <div className="review_card position-absolute bottom-0 left-0 my-3">
//             <p className="m-0">
//               4.8 <span><i className="fa-solid fa-star ps-1 text-warning"></i></span>
//             </p>
//           </div>
//         </div>

//         {/* Mobile View */}
//         <div className="card-body p-0 d-lg-none d-md-block">
//           <div className="text-center pt-1">
//             <p className="m-0">{formatCurrency(total14KT)}</p>
//             <h6>{title}</h6>
//           </div>

//           <div>
//             <button onClick={() => slider?.current?.slickPrev()} className="absolute_prev_btn d-lg-none d-block">
//               <i className="ri-arrow-left-wide-line"></i>
//             </button>
//             <button onClick={() => slider?.current?.slickNext()} className="absolute_next_btn d-lg-none d-block">
//               <i className="ri-arrow-right-wide-line"></i>
//             </button>
//           </div>

//           <div className="d-flex align-items-center color_md">
//             <i
//               className={`fs-4 absolute_heart heart-icon ${isWishlist ? 'ri-heart-fill text-dark' : 'ri-heart-line'}`}
//               style={{ cursor: 'pointer' }}
//               onClick={handleWishlistToggle}
//             ></i>
//           </div>
//           <div className="review_card review_card_md position-absolute left-0 my-3">
//             <p className="m-0">
//               4.8 <span><i className="fa-solid fa-star ps-1 text-warning"></i></span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
