import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { cartAction } from '../../Store/Slice/CartSlice';
import products from '../../fakedata/Product';
import Loader from '../Loader';
import { formatCurrency } from '../../Utils/formateCurrency';
import axios from 'axios';
import { toast } from 'react-toastify';
import Slider from 'react-slick/lib/slider';


const Productdetails = () => {
    const [loading, setLoading] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedPurity, setSelectedPurity] = useState('14KT'); // State to track the selected button (14KT or 18KT)

    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams()
    const Product = products.find(item => item.id === id)
    const { title, price, image01, delprice } = Product;


    const dispatch = useDispatch();
    // const addToCart = () => {
    //     // setLoading(true);

    //     dispatch(cartAction.addItem({ id, title, price, image01 }));

    //     // setTimeout(() => {
    //     //     setLoading(false);
    //     //     navigate('/cart');
    //     // }, 2000);
    // };
    const addToCart = async () => {
        setLoading(true);
        toast.success("Product added to cart successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        const cartItem = {
            id,
            title,
            price,
            image01,
            totalprice: price // Assuming price is used for total price
        };

        try {
            const response = await axios.post('http://localhost:5000/v1/carts/add', cartItem);

            if (response.status === 201) {
                dispatch(cartAction.addItem(response.data));
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setLoading(false);
        }
    };

    // const buyNow = () => {
    //     setLoading(true);

    //     setTimeout(() => {
    //         setLoading(false);
    //         navigate('/cart');
    //     }, 2000);
    // };
    const buyNow = async () => {
        setLoading(true); // Set loading to true

        const cartItem = {
            id,
            title,
            price,
            image01,
            totalprice: price
        };

        try {
            const response = await axios.post('http://localhost:5000/v1/carts/add', cartItem);

            if (response.status === 201) {
                dispatch(cartAction.addItem(response.data)); // Dispatch action to add item

                // Delay navigation to the cart after adding the item
                setTimeout(() => {
                    setLoading(false); // Set loading to false before navigating
                    navigate('/cart'); // Navigate to the cart page
                }, 2000); // 5 seconds delay
            } else {
                setLoading(false); // Handle unexpected response status
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setLoading(false); // Set loading to false on error
        }
    };


    const colors = [
        { id: 1, color: "#ffcccc" },
        { id: 2, color: "#cccccc" },
        { id: 3, color: "#ffcc66" }
    ];

    const handleColorClick = (colorId) => {
        setSelectedColor(selectedColor === colorId ? null : colorId);
    };
    const handleButtonClick = (purity) => {
        setSelectedPurity(purity);
    };
    var md_carousel = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            {loading && <Loader />}
            <section className='container-fluid pb-4 pt-2'>
                <div>
                    <div className='row '>
                        <div className='col-lg-4 col-md-6 col-sm-12 col-12 m-0 p-0 d-lg-block d-none'>
                            <img alt='' src='https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_1_lar.jpg' className='img-fluid p-1'></img>
                            <img alt='' src='https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_3_lar.jpg' className='img-fluid p-1'></img>
                            <img alt='' src='https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_5_lar.jpg' className='img-fluid p-1'></img>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12 col-12 m-0 p-0 d-lg-block d-none'>
                            <img alt='' src='https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_4_lar.jpg' className='img-fluid p-1'></img>
                            <img alt='' src='https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_7_lar.jpg' className='img-fluid p-1'></img>
                            <video autoPlay loop controls muted style={{ width: "485px" }} className='item1 video p-1'>
                                <source src="https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_16_video.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <section className='container-fluid m-0 p-0 mb-5 d-lg-none d-block'>
                            <Slider {...md_carousel}>
                                <div>
                                    <img alt='' src='https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_1_lar.jpg' className='img-fluid p-1'></img>
                                </div>
                                <div>
                                    <img alt='' src='https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_3_lar.jpg' className='img-fluid p-1'></img>
                                </div>
                                <div>
                                    <img alt='' src='https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_5_lar.jpg' className='img-fluid p-1'></img>
                                </div>
                                <div>
                                    <img alt='' src='https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_4_lar.jpg' className='img-fluid p-1'></img>
                                </div>
                                <div>
                                    <img alt='' src='https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_7_lar.jpg' className='img-fluid p-1'></img>
                                </div>
                                <div>
                                    <video autoPlay loop controls muted style={{ width: "485px" }} className='item1 video p-1'>
                                        <source src="https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_16_video.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </Slider>
                        </section>
                        {/* =========Larger device========= */}
                        <div className='col-lg-4 col-md-6 col-sm-12 col-12 ps-3 mt-4 mx-auto d-block d-lg-block d-none sticky-header'>
                            <h3>{title}</h3>
                            <h4 className='fw-bold'>{formatCurrency(price)}</h4>
                            <p className='m-0 p-0 title_taxes pt-2'>Price inclusive of taxes. See the full <span>price breakup</span></p>
                            <p className='title_offer'><i className="ri-discount-percent-line"></i>&nbsp;Special offer for you</p>
                            <p>
                                <span style={{ fontSize: "12px" }} className='fw-bold'>COLOR</span>
                                <span className='ps-3' style={{ fontSize: "20px" }}>
                                    {colors.map(color => (
                                        <i
                                            key={color.id}
                                            className="ri-circle-fill"
                                            style={{ color: color.color, fontSize: "20px", position: 'relative', cursor: 'pointer' }}
                                            onClick={() => handleColorClick(color.id)}
                                        >
                                            {selectedColor === color.id && (
                                                <i className="ri-check-line" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '12px' }}></i>
                                            )}
                                        </i>
                                    ))}
                                </span>
                            </p>
                            {/* <p>
                                <span className='fw-bold me-3' style={{ fontSize: "12px" }}>PURITY</span>
                                <button
                                    className='btn mx-1 pt-2'
                                    style={{
                                        fontSize: "11px",
                                        backgroundColor: selectedPurity === '14KT' ? '#ffcc00' : '#000',
                                        color: selectedPurity === '14KT' ? '#000' : '#fff'
                                    }}
                                    onClick={() => handleButtonClick('14KT')}
                                >
                                    14 KT
                                </button>
                                <button
                                    className='btn mx-1 pt-2'
                                    style={{
                                        fontSize: "11px",
                                        backgroundColor: selectedPurity === '18KT' ? '#ffcc00' : '#000', // Change bg color when selected
                                        color: selectedPurity === '18KT' ? '#000' : '#fff' // Change text color to black when selected
                                    }}
                                    onClick={() => handleButtonClick('18KT')}
                                >
                                    18 KT
                                </button>
                            </p> */}
                            <p>
                                <span style={{ fontSize: "12px" }} className='fw-bold me-4'>SIZE</span>
                                <span className='ps-3' style={{ fontSize: "13px", color: "#212529" }}>6.5 inches</span>
                                <button className='btn add_btn ms-2' data-bs-toggle="offcanvas" data-bs-target="#offcanvassize" aria-controls="offcanvassize">CUSTOMISE</button>
                            </p>

                            <button className='btn add_btn me-2 px-5 mt-3' onClick={addToCart}>
                                <i className="ri-shopping-bag-4-line pe-2 fs-5"></i>
                                ADD TO CART
                            </button>
                            <button className='btn add_btn px-5 mt-3' onClick={buyNow}>
                                <i className="ri-shopping-cart-2-line pe-2 fs-5"></i>
                                BUY NOW
                            </button>
                            <p className='delivery_cancellation pt-4'>
                                <i className="ri-truck-line fs-5 pe-2"></i>
                                <u> DELIVERY & CANCELLATION ESTIMATED DELIVERY BY 3RD SEP 2024</u>
                            </p>
                            <p className='pincode_productdetail pt-2 p-0 m-0'>Your Pincode</p>
                            <div className="input-group mb-3 w-100 pincode_input">
                                <input type="text" className="form-control" aria-describedby="basic-addon2" />
                                <i className="ri-map-pin-line input-group-text" id="basic-addon2"></i>
                            </div>
                            <p className='m-0'>
                                <span className='category_tag'>CATEGORIES:</span>
                                <span className='category_tag1'>Bracelet</span>
                            </p>
                            <p>
                                <span className='category_tag'>TAGS:</span>
                                <span className='category_tag1'>Bestsellers, Solitaire, Workwear</span>
                            </p>
                            <p>
                                <span className='fw-bold' style={{ fontSize: "14px" }}>Share On:</span>
                                <i className="ri-facebook-circle-fill fs-2 pe-1 ps-2" style={{ color: "#0c5581" }}></i>
                                <i className="ri-whatsapp-fill fs-2 pe-1" style={{ color: "#46b63b" }}></i>
                                <i className="ri-telegram-fill fs-2 pe-1" style={{ color: "#1c90ca" }}></i>
                                <i className="ri-clipboard-fill fs-2 pe-1"></i>
                            </p>
                            <div>
                                <div className='row w-100 border rounded-3'>
                                    <div className='col-lg-4 col-md-4 col-sm-4 col-4 m-0 p-0'>
                                        <img alt='' src='data:image/jpeg;base64,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' className='img-fluid'></img>
                                    </div>
                                    <div className='col-lg-8 col-md-8 col-sm-8 col-8 video_call'>
                                        <h6>Live Video Call</h6>
                                        <p>Join a live video call with our consultants to see your favourite designs up close!</p>
                                        <button className='btn'>Schedule a Video Call</button>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <div className='row w-100 border rounded-3 store py-2 my-2'>
                                    <div className='col-lg-1 col-md-2 col-sm-2 col-2 m-0 p-0'>
                                        <i className="ri-store-2-line fs-2 ps-2"></i>
                                        {/* <img alt='' src='assets/img/store.png' className='img-fluid'></img> */}
                                    </div>
                                    <div className='col-lg-11 col-md-10 col-sm-10 col-10'>
                                        <h6>Nearest Store - <span className='fw-bold'>Adajan</span> (2km)</h6>
                                        <p>Also Available in
                                            <span style={{ color: "#de57e5" }} className='fw-bold'> 2 Other Stores</span>
                                        </p>
                                    </div>
                                    <button className='btn w-75 mx-auto d-block'>FIND IN STORE</button>
                                </div>
                            </div>
                            <div className='border rounded-3 services me-2 px-3 pt-3 mt-3'>
                                <div className=''>
                                    <h6>Try at Home service is not available</h6>
                                    <p>Browse other Designs</p>
                                </div>
                            </div>
                            <div className='certified_Sec mt-4'>
                                <div className='row'>
                                    <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
                                        {/* <img alt='' src='assets/img/cl-advantage-sprite (2).png' className='img-fluid mx-auto d-block w-50'></img> */}
                                        <i className="ri-verified-badge-line fs-1"></i>
                                        <p>100% <br />Certified</p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
                                        {/* <img alt='' src='assets/img/cl-advantage-sprite (1).png' className='img-fluid mx-auto d-block w-50'></img> */}
                                        <i className="ri-replay-15-line fs-1"></i>
                                        <p>15 Day <br />Money Back</p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
                                        {/* <img alt='' src='assets/img/cl-advantage-sprite (3).png' className='img-fluid mx-auto d-block w-50'></img> */}
                                        <i className="ri-exchange-funds-line fs-1"></i>
                                        <p>Lifetime Exchange</p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
                                        {/* <img alt='' src='assets/img/cl-advantage-sprite (4).png' className='img-fluid mx-auto d-block w-50'></img> */}
                                        <i className="ri-calendar-line fs-1"></i>
                                        <p>One Year Warranty</p>
                                    </div>
                                </div>
                            </div>
                            <div className='rounded-3 policy_sec pt-3 px-3 pb-2 pt-4 mt-3'>
                                <h6>Earn 894 xCLusive points with this order</h6>
                                <p>(1 xClusive point = ₹1)</p>
                            </div>
                            <div className='mt-2'>
                                <p className='text-center' style={{ fontSize: "13px" }}>Learn more on about our <span className='fw-bold' style={{ color: "#de57e5" }}>TERMS & POLICIES</span></p>
                            </div>
                            <div className='mt-5'>
                                <div className='row text-center'>
                                    <div className='col-lg-4 col-md-4 col-sm-6 col-12  mt-2'>
                                        {/* <img alt='' src='assets/img/delivery.png' className='img-fluid mx-auto d-block'></img> */}
                                        <i className="ri-discount-percent-line fs-1"></i>
                                        <p style={{ fontSize: "14px" }} className='m-0 pt-2'>100% BIS</p>
                                        <p style={{ fontSize: "11px" }}>Hallmarked Jewellery</p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2'>
                                        {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (3).png' className='img-fluid mx-auto d-block'></img> */}
                                        <i className="ri-bubble-chart-line fs-1"></i>
                                        <p style={{ fontSize: "14px" }} className='m-0 pt-2'>Trust of Tanishq</p>
                                        <p style={{ fontSize: "11px" }}>Titan Privileges</p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2'>
                                        <i className="ri-verified-badge-line fs-1 text-success"></i>
                                        {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (2).png' className='img-fluid mx-auto d-block'></img> */}
                                        <p style={{ fontSize: "14px" }} className='m-0 pt-2'>100% Certified</p>
                                        <p style={{ fontSize: "11px" }}>by CaratLane</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* =========Medium device========= */}
                    <div className='row d-lg-none d-block'>
                        <div className='col-md-12 col-sm-12 col-12 mx-auto d-block'>
                            <h3>{title}</h3>
                            <h4 className='fw-bold'>₹{price}</h4>
                            <p className='m-0 p-0 title_taxes pt-2'>Price inclusive of taxes. See the full <span>price breakup</span></p>
                            <p className='title_offer'><i className="ri-discount-percent-line"></i>&nbsp;Special offer for you</p>
                            <p>
                                <span style={{ fontSize: "12px" }} className='fw-bold'>COLOR</span>
                                <span className='ps-3' style={{ fontSize: "20px" }}>
                                    {colors.map(color => (
                                        <i
                                            key={color.id}
                                            className="ri-circle-fill"
                                            style={{ color: color.color, fontSize: "20px", position: 'relative', cursor: 'pointer' }}
                                            onClick={() => handleColorClick(color.id)}
                                        >
                                            {selectedColor === color.id && (
                                                <i className="ri-check-line" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '12px' }}></i>
                                            )}
                                        </i>
                                    ))}
                                </span>
                            </p>
                            {/* <p>
                                <span className='fw-bold me-3' style={{ fontSize: "12px" }}>PURITY</span>
                                <button
                                    className='btn mx-1 pt-2'
                                    style={{
                                        fontSize: "11px",
                                        backgroundColor: selectedPurity === '14KT' ? '#ffcc00' : '#000',
                                        color: selectedPurity === '14KT' ? '#000' : '#fff'
                                    }}
                                    onClick={() => handleButtonClick('14KT')}
                                >
                                    14 KT
                                </button>
                                <button
                                    className='btn mx-1 pt-2'
                                    style={{
                                        fontSize: "11px",
                                        backgroundColor: selectedPurity === '18KT' ? '#ffcc00' : '#000', // Change bg color when selected
                                        color: selectedPurity === '18KT' ? '#000' : '#fff' // Change text color to black when selected
                                    }}
                                    onClick={() => handleButtonClick('18KT')}
                                >
                                    18 KT
                                </button>
                            </p> */}
                            <p>
                                <span style={{ fontSize: "12px" }} className='fw-bold me-4'>SIZE</span>
                                <span className='ps-3' style={{ fontSize: "13px", color: "#212529" }}>6.5 inches</span>
                                <button className='btn add_btn ms-2' data-bs-toggle="offcanvas" data-bs-target="#mdoffcanvassize" aria-controls="mdoffcanvassize">CUSTOMISE</button>
                            </p>
                            <button className='btn add_btn add_btn_md me-2 px-5 mt-3' onClick={addToCart}>
                                <i className="ri-shopping-bag-4-line pe-2 fs-5"></i>
                                ADD TO CART
                            </button>
                            <button className='btn add_btn add_btn_md px-5 mt-3'>
                                <i className="ri-shopping-cart-2-line pe-2 fs-5"></i>
                                BUY NOW
                            </button>
                            <p className='delivery_cancellation pt-4'>
                                <i className="ri-truck-line fs-5 pe-2"></i>
                                <u> DELIVERY & CANCELLATION ESTIMATED DELIVERY BY 3RD SEP 2024</u>
                            </p>
                            <p className='pincode_productdetail pt-2 p-0 m-0'>Your Pincode</p>
                            <div className="input-group mb-3 w-100 pincode_input">
                                <input type="text" className="form-control" aria-describedby="basic-addon2" />
                                <i className="ri-map-pin-line input-group-text" id="basic-addon2"></i>
                            </div>
                            <p className='m-0'>
                                <span className='category_tag'>CATEGORIES:</span>
                                <span className='category_tag1'>Bracelet</span>
                            </p>
                            <p>
                                <span className='category_tag'>TAGS:</span>
                                <span className='category_tag1'>Bestsellers, Solitaire, Workwear</span>
                            </p>
                            <p>
                                <span className='fw-bold' style={{ fontSize: "14px" }}>Share On:</span>
                                <i className="ri-facebook-circle-fill fs-2 pe-1 ps-2" style={{ color: "#0c5581" }}></i>
                                <i className="ri-whatsapp-fill fs-2 pe-1" style={{ color: "#46b63b" }}></i>
                                <i className="ri-telegram-fill fs-2 pe-1" style={{ color: "#1c90ca" }}></i>
                                <i className="ri-clipboard-fill fs-2 pe-1"></i>
                            </p>
                            <div className='ps-3'>
                                <div className='row w-100 border rounded-3'>
                                    <div className='col-lg-4 col-md-4 col-sm-4 col-4 m-0 p-0'>
                                        <img alt='' src='data:image/jpeg;base64,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' className='img-fluid video_call_img'></img>
                                    </div>
                                    <div className='col-lg-8 col-md-8 col-sm-8 col-8 video_call'>
                                        <h6>Live Video Call</h6>
                                        <p>Join a live video call with our consultants to see your favourite designs up close!</p>
                                        <button className='btn'>Schedule a Video Call</button>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3 ps-3'>
                                <div className='row w-100 border rounded-3 store py-2 my-2'>
                                    <div className='col-md-1 col-sm-1 col-2 m-0 p-0'>
                                        {/* <i className="ri-store-2-line fs-1 ps-2"></i> */}
                                        {/* <img alt='' src='assets/img/store.png' className='img-fluid'></img> */}
                                    </div>
                                    <div className='col-md-11 col-sm-11 col-10'>
                                        <h6>Nearest Store - <span className='fw-bold'>Adajan</span> (2km)</h6>
                                        <p>Also Available in
                                            <span style={{ color: "#de57e5" }} className='fw-bold'> 2 Other Stores</span>
                                        </p>
                                    </div>
                                    <button className='btn w-75 mx-auto d-block'>FIND IN STORE</button>
                                </div>
                            </div>
                            <div className='border rounded-3 services me-2 px-3 pt-3 mt-3'>
                                <div className=''>
                                    <h6>Try at Home service is not available</h6>
                                    <p>Browse other Designs</p>
                                </div>
                            </div>
                            <div className='certified_Sec mt-4'>
                                <div className='row'>
                                    <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
                                        {/* <img alt='' src='assets/img/cl-advantage-sprite (2).png' className='img-fluid mx-auto d-block w-50'></img> */}
                                        <i className="ri-verified-badge-line fs-1"></i>
                                        <p>100% <br />Certified</p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
                                        {/* <img alt='' src='assets/img/cl-advantage-sprite (1).png' className='img-fluid mx-auto d-block w-50'></img> */}
                                        <i className="ri-replay-15-line fs-1"></i>
                                        <p>15 Day <br />Money Back</p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
                                        {/* <img alt='' src='assets/img/cl-advantage-sprite (3).png' className='img-fluid mx-auto d-block w-50'></img> */}
                                        <i className="ri-exchange-funds-line fs-1"></i>
                                        <p>Lifetime Exchange</p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
                                        {/* <img alt='' src='assets/img/cl-advantage-sprite (4).png' className='img-fluid mx-auto d-block w-50'></img> */}
                                        <i className="ri-calendar-line fs-1"></i>
                                        <p>One Year Warranty</p>
                                    </div>
                                </div>
                            </div>
                            <div className='rounded-3 policy_sec pt-3 px-3 pb-2 pt-4 mt-3'>
                                <h6>Earn 894 xCLusive points with this order</h6>
                                <p>(1 xClusive point = ₹1)</p>
                            </div>
                            <div className='mt-2'>
                                <p className='text-center' style={{ fontSize: "13px" }}>Learn more on about our <span className='fw-bold' style={{ color: "#de57e5" }}>TERMS & POLICIES</span></p>
                            </div>
                            <div className='mt-5'>
                                <div className='row text-center'>
                                    <div className='col-lg-4 col-md-4 col-sm-6 col-12  mt-2'>
                                        {/* <img alt='' src='assets/img/delivery.png' className='img-fluid mx-auto d-block'></img> */}
                                        <i className="ri-discount-percent-line fs-1"></i>
                                        <p style={{ fontSize: "14px" }} className='m-0 pt-2'>100% BIS</p>
                                        <p style={{ fontSize: "11px" }}>Hallmarked Jewellery</p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2'>
                                        {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (3).png' className='img-fluid mx-auto d-block'></img> */}
                                        <i className="ri-bubble-chart-line fs-1"></i>
                                        <p style={{ fontSize: "14px" }} className='m-0 pt-2'>Trust of Tanishq</p>
                                        <p style={{ fontSize: "11px" }}>Titan Privileges</p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2'>
                                        <i className="ri-verified-badge-line fs-1 text-success"></i>
                                        {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (2).png' className='img-fluid mx-auto d-block'></img> */}
                                        <p style={{ fontSize: "14px" }} className='m-0 pt-2'>100% Certified</p>
                                        <p style={{ fontSize: "11px" }}>by CaratLane</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ============you may also like============= */}
            <section className='container my-3'>
                <h3 className='text-center pb-4 fw-bold'>You may also Like</h3>
                <div className='row '>
                    {/* <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mx-auto d-block'>
                        <div className='card border-0 '>
                            <Link to="/productDetail"><img alt='' src='assets/img/cartlane8.png' className='img-fluid'></img></Link>
                            <div className='card-body relative'>
                                <h5>₹6,254</h5>
                                <p>Heart with crown stud Earring</p>
                                <i className="ri-heart-add-line fs-4"></i>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mx-auto d-block'>
                        <div className='card border-0 relative'>
                            <img alt='' src='assets/img/cartlane8.png' className='img-fluid'></img>
                            <div className='card-body'>
                                <h5>₹6,254</h5>
                                <p>Heart with crown stud Earring</p>
                                <i className="ri-heart-add-line fs-4"></i>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mx-auto d-block'>
                        <div className='card border-0 relative'>
                            <img alt='' src='assets/img/cartlane8.png' className='img-fluid'></img>
                            <div className='card-body'>
                                <h5>₹6,254</h5>
                                <p>Heart with crown stud Earring</p>
                                <i className="ri-heart-add-line fs-4"></i>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mx-auto d-block'>
                        <div className='card border-0 relative'>
                            <img alt='' src='assets/img/cartlane8.png' className='img-fluid'></img>
                            <div className='card-body'>
                                <h5>₹6,254</h5>
                                <p>Heart with crown stud Earring</p>
                                <i className="ri-heart-add-line fs-4 "></i>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>

            {/* Large Offcanvas */}
            <div className="offcanvas offcanvas-end offcanvas_end_size" tabIndex="-1" id="offcanvassize" aria-labelledby="offcanvassizeLabel">
                <div className="offcanvas-header offcanvas_size_header d-flex justify-content-between align-items-center">
                    <div className="text-start pt-5">
                        <p className='m-0 p-0'>Estimated price</p>
                        <span className="fw-bold" style={{ fontSize: "18px" }}>{formatCurrency(price)}&nbsp;</span>
                        <span className="text-decoration-line-through text-muted">{formatCurrency(delprice)}</span>
                    </div>
                    <div className="text-end">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        <div className='pt-3 delivery_size'>
                            <p className='m-0 p-0'>Delivery By</p>
                            <span className="fw-bold">14th Oct</span>
                        </div>

                    </div>
                </div>

                <div className="offcanvas-body offcanvas_body_size">
                    {/* Choice of Metal */}
                    <div className="mb-2 metal_offcanvas">
                        <h6 className="text-dark mb-3">Choice of Metal</h6>
                        <div className="row g-3">
                            {/* Metal Options */}
                            {['18KT Yellow Gold', '14KT White Gold', '16KT Rose Gold'].map((metal, index) => (
                                <div key={index} className="col-3">
                                    <button className="btn size-btn w-100 p-3">
                                        <p>{metal}</p>
                                        <small className="text-muted d-block">in Stock!</small>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Diamond Quality */}
                    <div className="mb-2">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-dark">Diamond Quality</h6>
                            <Link to="">Diamond Guide</Link>
                        </div>
                        <div className="row g-3 diamond_offcanvas">
                            {[
                                { quality: "IJ-SI", status: "Only 4 left!" },
                                { quality: "GH-VS", status: "Made to Order" },
                                { quality: "GH-VVS", status: "Made to Order" },
                                { quality: "EF-VVS", status: "Made to Order" },
                                { quality: "GH-SI", status: "in Stock!" },
                            ].map((item, index) => (
                                <div key={index} className="col-3">
                                    <button
                                        className={`btn size-btn w-100 p-3 ${item.selected ? 'selected' : ''}`}
                                    >
                                        <p className="fw-bold m-0 p-0">{item.quality}</p>
                                        <small>{item.status}</small>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Select Size */}
                    <div className="mb-2">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="text-dark">Select Size</h6>
                            <Link to="">Size Guide</Link>
                        </div>
                        <div className="row g-3 size_offcanvas">
                            {/* Size buttons */}
                            {[
                                { size: 5, mm: "44.8 mm", stock: "Made to Order" },
                                { size: 6, mm: "45.9 mm", stock: "Made to Order" },
                                { size: 7, mm: "47.1 mm", stock: "Only 4 left!" },
                                { size: 8, mm: "48.1 mm", stock: "In Stock!" },
                                { size: 9, mm: "49.0 mm", stock: "In Stock!" },
                                { size: 10, mm: "50.0 mm", stock: "In Stock!" },
                                { size: 11, mm: "50.9 mm", stock: "In Stock!" },
                                { size: 12, mm: "51.8 mm", stock: "In Stock!", selected: true },
                                { size: 13, mm: "52.8 mm", stock: "In Stock!" },
                                { size: 14, mm: "54.0 mm", stock: "In Stock!" },
                                { size: 15, mm: "55.0 mm", stock: "In Stock!" },
                                { size: 16, mm: "55.9 mm", stock: "In Stock!" },
                            ].map((item, index) => (
                                <div key={index} className="col-3">
                                    <button
                                        className="btn size-btn w-100 p-2 text-center"
                                    >
                                        <p className="fs-6 fw-bold m-0 p-0">{item.size}</p>
                                        <p className="text-muted m-0 p-0">{item.mm}</p>
                                        <small >{item.stock}</small>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="offcanvas-footer text-center offcanvas_size_btn">
                    <button className="btn w-100 py-3 fw-bold text-uppercase">Confirm Customisation</button>
                </div>
            </div>
            {/* Md Offcanvas */}
            <div className="offcanvas offcanvas-bottom offcanvas_bottom_size" tabIndex="-1" id="mdoffcanvassize" aria-labelledby="mdoffcanvassizeLabel">
                <div className="offcanvas-header offcanvas_size_header d-flex justify-content-between align-items-center">
                    <div className="text-start pt-5">
                        <p className='m-0 p-0'>Estimated price</p>
                        <span className="fw-bold" style={{ fontSize: "18px" }}>{formatCurrency(price)}&nbsp;</span>
                        <span className="text-decoration-line-through text-muted">{formatCurrency(delprice)}</span>
                    </div>
                    <div className="text-end">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        <div className='pt-3 delivery_size'>
                            <p className='m-0 p-0'>Delivery By</p>
                            <span className="fw-bold">14th Oct</span>
                        </div>

                    </div>
                </div>

                <div className="offcanvas-body offcanvas_body_size">
                    {/* Choice of Metal */}
                    <div className="mb-2 metal_offcanvas">
                        <h6 className="text-dark mb-3">Choice of Metal</h6>
                        <div className="row g-3">
                            {/* Metal Options */}
                            {['18KT Yellow Gold', '14KT White Gold', '16KT Rose Gold'].map((metal, index) => (
                                <div key={index} className="col-3">
                                    <button className="btn size-btn w-100">
                                        <p>{metal}</p>
                                        <small className="text-muted d-block">in Stock!</small>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Diamond Quality */}
                    <div className="mb-2">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-dark">Diamond Quality</h6>
                            <Link to="">Diamond Guide</Link>
                        </div>
                        <div className="row g-3 diamond_offcanvas">
                            {[
                                { quality: "IJ-SI", status: "Only 4 left!" },
                                { quality: "GH-VS", status: "Made to Order" },
                                { quality: "GH-VVS", status: "Made to Order" },
                                { quality: "EF-VVS", status: "Made to Order" },
                                { quality: "GH-SI", status: "in Stock!" },
                            ].map((item, index) => (
                                <div key={index} className="col-3">
                                    <button
                                        className={`btn size-btn w-100 ${item.selected ? 'selected' : ''}`}
                                    >
                                        <p className="fw-bold m-0 p-0">{item.quality}</p>
                                        <small>{item.status}</small>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Select Size */}
                    <div className="mb-2">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="text-dark">Select Size</h6>
                            <Link to="">Size Guide</Link>
                        </div>
                        <div className="row g-3 size_offcanvas">
                            {/* Size buttons */}
                            {[
                                { size: 5, mm: "44.8 mm", stock: "Made to Order" },
                                { size: 6, mm: "45.9 mm", stock: "Made to Order" },
                                { size: 7, mm: "47.1 mm", stock: "Only 4 left!" },
                                { size: 8, mm: "48.1 mm", stock: "In Stock!" },
                                { size: 9, mm: "49.0 mm", stock: "In Stock!" },
                                { size: 10, mm: "50.0 mm", stock: "In Stock!" },
                                { size: 11, mm: "50.9 mm", stock: "In Stock!" },
                                { size: 12, mm: "51.8 mm", stock: "In Stock!", selected: true },
                                { size: 13, mm: "52.8 mm", stock: "In Stock!" },
                                { size: 14, mm: "54.0 mm", stock: "In Stock!" },
                                { size: 15, mm: "55.0 mm", stock: "In Stock!" },
                                { size: 16, mm: "55.9 mm", stock: "In Stock!" },
                            ].map((item, index) => (
                                <div key={index} className="col-3">
                                    <button
                                        className="btn size-btn w-100 text-center"
                                    >
                                        <p className="fs-6 fw-bold m-0 p-0">{item.size}</p>
                                        <p className="text-muted m-0 p-0">{item.mm}</p>
                                        <small >{item.stock}</small>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="offcanvas-footer text-center offcanvas_size_btn">
                    <button className="btn w-100 py-3 fw-bold text-uppercase">Confirm Customisation</button>
                </div>
            </div>
        </>
    )
}

export default Productdetails