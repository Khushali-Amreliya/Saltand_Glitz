import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { cartAction } from '../../Store/Slice/CartSlice';
import Loader from '../Loader';
import { formatCurrency } from '../../Utils/formateCurrency';
import axios from 'axios';
const ProductCard = (props) => {
    const [loading, setLoading] = useState(false);
    const { id, title, price, image01, image02, image03 } = props.Productsitem;
    const dispatch = useDispatch();
    const slider = useRef(null);
    const navigate = useNavigate();

    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const wishlist = useSelector((state) => state.cart.wishlistItem);

    useEffect(() => {
        // Check if the item is already in the wishlist
        const itemInWishlist = wishlist.find(item => item.id === id);
        setIsHeartFilled(!!itemInWishlist);
    }, [wishlist, id]);

    // const addToCart = () => {
    //     setLoading(true);

    //     dispatch(cartAction.addItem({ id, title, price, image01 }));

    //     setTimeout(() => {
    //         setLoading(false);
    //         navigate('/cart');
    //     }, 2000);
    // };

    const handleHeartClick = () => {
        if (isHeartFilled) {
            dispatch(cartAction.removeFromWishlist(id));
        } else {
            dispatch(cartAction.addToWishlist({ id, title, price, image01 }));
        }
        setIsHeartFilled(!isHeartFilled);
    };
    const addToCart = async () => {
        setLoading(true);

        const cartItem = { id, title, price, image01 };

        try {

            const response = await axios.post('http://localhost:5000/v1/carts/add', cartItem);

            if (response.status === 201) {
                dispatch(cartAction.addItem(response.data)); // Update Redux store if needed
                setLoading(false);
                navigate('/cart'); // Redirect to cart after adding
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setLoading(false);
        }
        setTimeout(() => {
            setLoading(false);
            navigate('/cart');
        }, 2000);
    };

    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <>
            {loading && <Loader />}
            <div className='card border-0'>
                <Link to={`/productDetail/${id}`}>
                    <Slider ref={slider} {...settings2} className='border border-1' style={{ borderRadius: "10px" }}  >
                        <img alt='' src={image01} className='img-fluid' />
                        <img alt='' src={image02} className='img-fluid' />
                        <img alt='' src={image03} className='img-fluid' />
                    </Slider>
                </Link>
                <div className='card-body relative'>
                    <p className='m-0'>{formatCurrency(price)}</p>
                    <h6>{title}</h6>
                    <i
                        className={`ri-heart-line absolute_heart fs-4 heart-icon ${isHeartFilled ? 'd-none' : ''}`}
                        onClick={handleHeartClick}
                    ></i>
                    <i
                        className={`ri-heart-fill absolute_heart fs-4 heart-icon ${isHeartFilled ? '' : 'd-none'}`}
                        onClick={handleHeartClick}
                    ></i>
                    <p className='absolute_latest btn'>LATEST</p>
                    <button className='heart-icon1 btn add_to_btn' onClick={addToCart}>
                        <span className='fw-bold'>ADD TO CART&nbsp;</span>
                    </button>
                    <button className='mx-auto d-block video_call_btn btn rounded-pill float-end'>
                        <i className="ri-video-on-fill text-light text-center"></i>
                    </button>
                    <button onClick={() => slider?.current?.slickPrev()} className='prev_btn absolute_prev_btn d-lg-block d-none'><i className="ri-arrow-left-wide-line"></i></button>
                    <button onClick={() => slider?.current?.slickNext()} className="next_btn absolute_next_btn d-lg-block d-none"><i className="ri-arrow-right-wide-line"></i></button>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
