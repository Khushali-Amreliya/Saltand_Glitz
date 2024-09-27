import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { cartAction } from '../../Store/Slice/CartSlice';
import Loader from '../Loader';
import { formatCurrency } from '../../Utils/formateCurrency';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductCard = React.memo(({ Productsitem }) => {
    const [loading, setLoading] = useState(false);
    const { id, title, price, image01, image02, image03 } = Productsitem;
    const dispatch = useDispatch();
    const slider = useRef(null);
    const navigate = useNavigate();
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const wishlist = useSelector((state) => state.cart.wishlistItem);
    // const [allProduct, setAllProduct] = useState([]);
    // const product = products.find(item => item.id === id);
    // const { category } = product;

    useEffect(() => {
        // Check if the item is already in the wishlist
        const itemInWishlist = wishlist.find(item => item.id === id);
        setIsHeartFilled(!!itemInWishlist);
    }, [wishlist, id]);

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
        toast.success("Product added to cart successfully!", {
            position: "top-center",
            autoClose: 1000,
        });

        const cartItem = { id, title, price, image01 };
        try {
            const response = await axios.post('http://localhost:5000/v1/carts/add', cartItem);
            if (response.status === 201) {
                dispatch(cartAction.addItem(response.data));
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
        setTimeout(() => {
            setLoading(false);
            navigate('/cart');
        }, 1000);
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    // const filterProductByCategory = (category) => {
    //     const filteredProducts = products.filter(item => item.category === category);
    //     setAllProduct(filteredProducts.slice(0, 4));
    // };

    // useEffect(() => {
    //     filterProductByCategory(category);
    // }, [category]);

    return (
        <>
            {loading && <Loader />}
            <div className='card border-0'>
                <Link to={`/productDetail/${id}`}>
                    <Slider ref={slider} {...sliderSettings} className='border border-1' style={{ borderRadius: "10px" }}>
                        <img loading="lazy" alt='' src={image01} className='img-fluid' />
                        <img loading="lazy" alt='' src={image02} className='img-fluid' />
                        <img loading="lazy" alt='' src={image03} className='img-fluid' />
                    </Slider>
                </Link>
                <div className="card-body relative">
                    <p className="m-0">{formatCurrency(price)}</p>
                    <h6>{title}</h6>

                    <div className="d-flex align-items-center">
                        <i
                            className={`ri-heart-line absolute_heart fs-4 heart-icon ${isHeartFilled ? 'd-none' : ''}`}
                            onClick={handleHeartClick}
                        ></i>
                        <i
                            className={`ri-heart-fill absolute_heart fs-4 heart-icon ${isHeartFilled ? '' : 'd-none'}`}
                            onClick={handleHeartClick}
                        ></i>

                        <button
                            className='view-similar-btn border-0 bg-light'
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                            // onClick={() => filterProductByCategory(category)}
                        >
                            <img
                                alt="view_similar"
                                src="assets/img/view_similar.png"
                                className="img-fluid"
                            />
                        </button>

                        <div className="offcanvas offcanvas-bottom bottom" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasBottomLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasBottomLabel">Similar Designs</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body small">
                                {/* {allProduct.map((item) => (
                                    <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 mx-auto d-block' key={item.id}>
                                        <ProductCard Productsitem={item} />
                                    </div>
                                ))} */}
                            </div>
                        </div>
                    </div>

                    <p className="absolute_latest btn">LATEST</p>

                    <button className="heart-icon1 btn add_to_btn" onClick={addToCart}>
                        <span className="fw-bold">ADD TO CART&nbsp;</span>
                    </button>

                    <button className="mx-auto d-block video_call_btn btn rounded-pill float-end">
                        <i className="ri-video-on-fill text-light text-center"></i>
                    </button>

                    <button onClick={() => slider?.current?.slickPrev()} className="prev_btn absolute_prev_btn d-lg-block d-none">
                        <i className="ri-arrow-left-wide-line"></i>
                    </button>
                    <button onClick={() => slider?.current?.slickNext()} className="next_btn absolute_next_btn d-lg-block d-none">
                        <i className="ri-arrow-right-wide-line"></i>
                    </button>
                </div>
            </div>
        </>
    );
});

export default ProductCard;
