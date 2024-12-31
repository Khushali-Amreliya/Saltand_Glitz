// import React, { useEffect, useMemo, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import { cartAction } from '../../Store/Slice/CartSlice';
// import products from '../../fakedata/Product';
// import Loader from '../Loader';
// import { formatCurrency } from '../../Utils/formateCurrency';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Slider from 'react-slick/lib/slider';
// import Helmet from '../../Components/Helmet';
// import ProductCard from './productCard';
// // import "../../css/Productdetail.css"

// const Productdetails = () => {
//     const search = React.useRef(null);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [selectedColor, setSelectedColor] = useState(2);
//     const [allProduct, setAllProduct] = useState(products)
//     const [selProduct, setSelProduct] = useState(null)
//     const navigate = useNavigate()
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [])


//     const { id } = useParams()
//     const { title, price, image01, category, delprice } = selProduct || {};
//     const dispatch = useDispatch();
//     // console.log(products);


//     useEffect(()=>{
//         const Product = products.find((item) => item.id === id);
//         setSelProduct(Product)
//     },[])

//     useEffect(() => {
//         dispatch(cartAction.addRecentlyViewed(selProduct));
//         // eslint-disable-next-line react-hooks/exhaustive-deps 
//     }, [dispatch]);

//     // recently viewd
//     const recentlyViewed = useSelector(state => state.cart.recentlyViewed);

//     const slider_search = {
//         slidesToShow: 5, // Default: Show 5 slides
//         slidesToScroll: 1, // Scroll one at a time
//         infinite: false, // Disable infinite scrolling
//         afterChange: (index) => setCurrentIndex(index), // Track index after change
//         responsive: [
//             {
//                 breakpoint: 1200, // For devices with width <= 1200px
//                 settings: {
//                     slidesToShow: 4,
//                 },
//             },
//             {
//                 breakpoint: 992, // For devices with width <= 992px
//                 settings: {
//                     slidesToShow: 3,
//                 },
//             },
//             {
//                 breakpoint: 768, // For devices with width <= 768px
//                 settings: {
//                     slidesToShow: 3,
//                 },
//             },
//             {
//                 breakpoint: 576, // For devices with width <= 576px
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//         ],
//     };

//     const addToCart = async () => {
//         setLoading(true);
//         toast.success("Product added to cart successfully!", {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });

//         // Use adjustedPrice to ensure the final price is added to the cart
//         const cartItem = {
//             id,
//             title,
//             price: adjustedPrice,
//             image01,
//             totalprice: adjustedPrice,
//             selectedSize,
//             confirmedMetal,
//             confirmedDiamondQuality
//         };

//         try {
//             const response = await axios.post('https://saltandglitzapi-rkm5g.kinsta.app/v1/carts/add', cartItem);

//             if (response.status === 201) {
//                 dispatch(cartAction.addItem(response.data));
//                 setTimeout(() => {
//                     setLoading(false);
//                 }, 2000);
//             } else {
//                 setLoading(false);
//             }
//         } catch (error) {
//             console.error('Error adding item to cart:', error);
//             setLoading(false);
//         }
//     };

//     const buyNow = async () => {
//         setLoading(true); // Set loading to true

//         const cartItem = {
//             id,
//             title,
//             price,
//             image01,
//             totalprice: price
//         };

//         try {
//             const response = await axios.post('https://saltandglitzapi-rkm5g.kinsta.app/v1/carts/add', cartItem);

//             if (response.status === 201) {
//                 dispatch(cartAction.addItem(response.data)); // Dispatch action to add item

//                 // Delay navigation to the cart after adding the item
//                 setTimeout(() => {
//                     setLoading(false); // Set loading to false before navigating
//                     navigate('/cart'); // Navigate to the cart page
//                 }, 2000); // 5 seconds delay
//             } else {
//                 setLoading(false); // Handle unexpected response status
//             }
//         } catch (error) {
//             console.error('Error adding item to cart:', error);
//             setLoading(false); // Set loading to false on error
//         }
//     };

//     const colors = [
//         { id: 1, color: "#ffcccc" },
//         { id: 2, color: "#cccccc" },
//         { id: 3, color: "#ffcc66" }
//     ]

//     const handleColorClick = (colorId) => {
//         setSelectedColor(selectedColor === colorId ? null : colorId);
//     };

//     var md_carousel = {
//         dots: true,
//         infinite: true,
//         speed: 1000,
//         autoplay: true,
//         autoplaySpeed: 5000,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//     };


//     const [selectedSize, setSelectedSize] = useState(null); // To track selected size
//     const [tempPrice, setTempPrice] = useState(price); // Temporary price for selected size
//     const [adjustedPrice, setAdjustedPrice] = useState(price); // Final price

//     const sizeOptions = useMemo(() => [
//         { size: 5, mm: "44.8 mm", stock: "Made to Order", price: Math.round(price * 0.95) },
//         { size: 6, mm: "45.9 mm", stock: "Made to Order", price: Math.round(price * 0.96) },
//         { size: 7, mm: "47.1 mm", stock: "Only 4 left!", price: Math.round(price * 0.97) },
//         { size: 8, mm: "48.1 mm", stock: "In Stock!", price: price }
//     ], [price]);


//     const metalOptions = useMemo(() => [
//         { metal: '18KT Yellow Gold', price: Math.round(price * 1.10) }, // 10% more
//         { metal: '14KT White Gold', price: price }, // No change for 14KT White Gold
//         { metal: '16KT Rose Gold', price: Math.round(price * 1.07) } // 7% more
//     ], [price]);

//     const diamondOptions = [
//         { quality: "IJ-SI", status: "Only 4 left!", price: Math.round(price * 1.02) }, // 2% more
//         { quality: "GH-VS", status: "Made to Order", price: Math.round(price * 1.04) }, // 4% more
//         { quality: "GH-VVS", status: "Made to Order", price: Math.round(price * 1.06) }, // 6% more
//         { quality: "EF-VVS", status: "Made to Order", price: Math.round(price * 1.08) }, // 8% more
//         { quality: "GH-SI", status: "In Stock!", price: price } // No change for GH-SI
//     ];

//     const [selectedMetal, setSelectedMetal] = useState(metalOptions[1].metal); // Track selected metal
//     const [confirmedMetal, setConfirmedMetal] = useState(metalOptions[1].metal); // Confirmed metal

//     const [selectedDiamondQuality, setSelectedDiamondQuality] = useState(diamondOptions[4].quality); // Default selection
//     const [confirmedDiamondQuality, setConfirmedDiamondQuality] = useState(diamondOptions[4].quality); // Confirmed quality with default


//     useEffect(() => {
//         const defaultSize = sizeOptions[3].size;  // Set default size to the specified option
//         setSelectedSize(defaultSize);

//         const selectedSizeData = sizeOptions.find((s) => s.size === defaultSize);
//         setTempPrice(selectedSizeData ? selectedSizeData.price : price);
//     }, [price, sizeOptions]);


//     const calculateTempPrice = (sizePrice, metalPrice, diamondPrice) => {
//         return sizePrice + metalPrice + diamondPrice - price;
//     };

//     const handleSizeClick = (size) => {
//         setSelectedSize(size);
//         const selectedSizeData = sizeOptions.find((s) => s.size === size);
//         const selectedMetalData = metalOptions.find((m) => m.metal === selectedMetal);
//         const selectedDiamondData = diamondOptions.find((d) => d.quality === selectedDiamondQuality);

//         setTempPrice(calculateTempPrice(
//             selectedSizeData ? selectedSizeData.price : price,
//             selectedMetalData ? selectedMetalData.price : 0,
//             selectedDiamondData ? selectedDiamondData.price : 0
//         ));
//     };

//     const handleMetalClick = (metal) => {
//         setSelectedMetal(metal);
//         const selectedSizeData = sizeOptions.find((s) => s.size === selectedSize);
//         const selectedMetalData = metalOptions.find((m) => m.metal === metal);
//         const selectedDiamondData = diamondOptions.find((d) => d.quality === selectedDiamondQuality);

//         setTempPrice(calculateTempPrice(
//             selectedSizeData ? selectedSizeData.price : price,
//             selectedMetalData ? selectedMetalData.price : 0,
//             selectedDiamondData ? selectedDiamondData.price : 0
//         ));
//     };

//     const handleDiamondQualityClick = (quality) => {
//         setSelectedDiamondQuality(quality);
//         const selectedSizeData = sizeOptions.find((s) => s.size === selectedSize);
//         const selectedMetalData = metalOptions.find((m) => m.metal === selectedMetal);
//         const selectedDiamondData = diamondOptions.find((d) => d.quality === quality);

//         setTempPrice(calculateTempPrice(
//             selectedSizeData ? selectedSizeData.price : price,
//             selectedMetalData ? selectedMetalData.price : 0,
//             selectedDiamondData ? selectedDiamondData.price : 0
//         ));
//     };

//     // CONFIRM BUTTON
//     const handleConfirm = () => {
//         setAdjustedPrice(tempPrice);
//         setConfirmedMetal(selectedMetal);
//         setConfirmedDiamondQuality(selectedDiamondQuality);

//         const offcanvas = document.getElementById('offcanvassize', 'offcanvasmetal', 'offcanvasDiamond');
//         const offcanvasInstance = new window.bootstrap.Offcanvas(offcanvas);
//         offcanvasInstance.hide();
//     };

//     useEffect(() => {
//         if (category === "Bracelet") {
//             const FilterProduct = products.filter(item => item.category === "Bracelet")
//             setAllProduct(FilterProduct.slice(0, 4))
//             // console.log(FilterProduct);
//         }
//         if (category === "Earring") {
//             const FilterProduct = products.filter(item => item.category === "Earring")
//             setAllProduct(FilterProduct)
//         }
//         if (category === "Necklace") {
//             const FilterProduct = products.filter(item => item.category === "Necklace")
//             setAllProduct(FilterProduct)
//         }
//         if (category === "Ring") {
//             const FilterProduct = products.filter(item => item.category === "Ring")
//             setAllProduct(FilterProduct)
//         }
//     }, [category])

//     const imagesByColor = {
//         1: [
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_1_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_3_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_5_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_4_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_7_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_16_video.mp4",
//         ],
//         2: [
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_5_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_3_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_1_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_7_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_4_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_16_video.mp4",
//         ],
//         3: [
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_4_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_7_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_1_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_3_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_5_lar.jpg",
//             "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_16_video.mp4",
//         ],
//     };
//     if (!selProduct) {
//         return <p>Product not found</p>;
//     }
//     return (
//         <Helmet title={title}>
//             <>
//                 {loading && <Loader />}
//                 <section className='container-fluid pb-4 pt-2'>
//                     <div>
//                         <div className='row '>
//                             <div className="col-lg-8 col-md-6 col-sm-12 col-12 m-0 p-0  d-lg-block d-none">
//                                 <div className="row">
//                                     {selectedColor && imagesByColor[selectedColor]?.map((src, index) => (
//                                         <div key={index} className="col-lg-6 col-md-6 col-sm-12 col-12 m-0 p-0">
//                                             {src.includes(".mp4") ? (
//                                                 <video
//                                                     autoPlay
//                                                     loop
//                                                     controls
//                                                     muted
//                                                     style={{ width: "100%" }}
//                                                     className='item1 video p-1'
//                                                 >
//                                                     <source src={src} type="video/mp4" />
//                                                 </video>
//                                             ) : (
//                                                 <img alt="" src={src} className="img-fluid p-1" />
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                             <section className='container-fluid m-0 p-0 mb-5 d-lg-none d-block'>
//                                 <Slider {...md_carousel}>
//                                     {selectedColor && imagesByColor[selectedColor]?.map((src, index) => (
//                                         <div key={index} >
//                                             {src.includes(".mp4") ? (
//                                                 <video
//                                                     autoPlay
//                                                     loop
//                                                     controls
//                                                     muted
//                                                     style={{ width: "100%" }}
//                                                     className='item1 video p-1'
//                                                 >
//                                                     <source src={src} type="video/mp4" />
//                                                 </video>
//                                             ) : (
//                                                 <img alt="" src={src} className="img-fluid p-1" />
//                                             )}
//                                         </div>
//                                     ))}
//                                 </Slider>
//                             </section>
//                             {/* =========Larger device========= */}
//                             <div className='col-lg-4 col-md-6 col-sm-12 col-12 px-4 mt-4 mx-auto d-block d-lg-block d-none sticky-header'>
//                                 <h3 className='font_h'>{title}</h3>
//                                 <h4 className='font_h'>{formatCurrency(adjustedPrice)}</h4>
//                                 <p className='m-0 p-0 title_taxes pt-2'>Price inclusive of taxes. See the full <span>price breakup</span></p>
//                                 <p className='title_offer'><i className="ri-discount-percent-line"></i>&nbsp;Special offer for you</p>
//                                 <p>
//                                     <span style={{ fontSize: "12px" }} className="fw-bold align-middle">
//                                         COLOR
//                                     </span>
//                                     <span className="ps-3 align-middle" style={{ fontSize: "20px" }}>
//                                         {colors.map((color) => (
//                                             <i
//                                                 key={color.id}
//                                                 className="ri-circle-fill"
//                                                 style={{
//                                                     color: color.color,
//                                                     fontSize: "20px",
//                                                     position: "relative",
//                                                     cursor: "pointer",
//                                                 }}
//                                                 onClick={() => handleColorClick(color.id)}
//                                             >
//                                                 {selectedColor === color.id && (
//                                                     <i
//                                                         className="ri-check-line"
//                                                         style={{
//                                                             position: "absolute",
//                                                             top: "50%",
//                                                             left: "50%",
//                                                             transform: "translate(-50%, -50%)",
//                                                             color: "#fff",
//                                                             fontSize: "12px",
//                                                         }}
//                                                     ></i>
//                                                 )}
//                                             </i>
//                                         ))}
//                                     </span>
//                                 </p>
//                                 {/* <p>
//                                     <span className='fw-bold me-3' style={{ fontSize: "12px" }}>PURITY</span>
//                                     <button
//                                         className='btn mx-1 pt-2'
//                                         style={{
//                                             fontSize: "11px",
//                                             backgroundColor: selectedPurity === '14KT' ? '#ffcc00' : '#000',
//                                             color: selectedPurity === '14KT' ? '#000' : '#fff'
//                                         }}
//                                         onClick={() => handleButtonClick('14KT')}
//                                     >
//                                         14 KT
//                                     </button>
//                                     <button
//                                         className='btn mx-1 pt-2'
//                                         style={{
//                                             fontSize: "11px",
//                                             backgroundColor: selectedPurity === '18KT' ? '#ffcc00' : '#000', // Change bg color when selected
//                                             color: selectedPurity === '18KT' ? '#000' : '#fff' // Change text color to black when selected
//                                         }}
//                                         onClick={() => handleButtonClick('18KT')}
//                                     >
//                                         18 KT
//                                     </button>
//                                 </p> */}
//                                 {/* <p className="border w-75 customize_sec">
//                                     <span></span>
//                                     <span>{confirmedMetal}</span>
//                                     <span>{confirmedDiamondQuality}</span>
//                                     <button className='float-end' data-bs-toggle="offcanvas" data-bs-target="#offcanvassize" aria-controls="offcanvassize">CUSTOMISE</button>
//                                  </p> */}
//                                 <p className="d-flex align-items-center customize_sec">
//                                     <div className="w-25 border-end px-2 py-1 bg-white" style={{ borderRadius: "10px 0px 0px 10px" }}>
//                                         <small className="text-muted">Size</small>
//                                         <p className="fw-bold mb-0">{selectedSize ? `${selectedSize} inches` : "Select Size"}</p>
//                                     </div>
//                                     <div className="w-25 border-end px-2 py-1 bg-white">
//                                         <small className="text-muted">Metal</small>
//                                         <p className="fw-bold mb-0">{confirmedMetal}</p>
//                                     </div>
//                                     <div className="w-25 border-end px-2 py-1 bg-white">
//                                         <small className="text-muted">Diamond</small>
//                                         <p className="fw-bold mb-0">{confirmedDiamondQuality}</p>
//                                     </div>
//                                     <div className="w-25">
//                                         <button
//                                             className="btn w-100 text-warning fw-bold"
//                                             data-bs-toggle="offcanvas"
//                                             data-bs-target="#offcanvassize"
//                                             aria-controls="offcanvassize"
//                                         >
//                                             CUSTOMISE
//                                         </button>
//                                     </div>
//                                 </p>
//                                 <button className='btn add_btn me-2 my-3' onClick={addToCart}>
//                                     {/* <i className="ri-shopping-bag-4-line pe-2 fs-5"></i> */}
//                                     ADD TO CART
//                                 </button>
//                                 <button className='btn add_btn my-3 me-2' onClick={buyNow}>
//                                     {/* <i className="ri-shopping-cart-2-line pe-2 fs-5"></i> */}
//                                     BUY NOW
//                                 </button>
//                                 <button className='btn wish_btn my-3' onClick={buyNow}>
//                                     <i className="fa-regular fa-heart fs-5"></i>
//                                 </button>
//                                 {/* <p className='delivery_cancellation pt-4'>
//                                     <i className="ri-truck-line fs-5 pe-2"></i>
//                                     <u> DELIVERY & CANCELLATION ESTIMATED DELIVERY BY 3RD SEP 2024</u>
//                                 </p> */}
//                                 {/* <p className='pincode_productdetail pt-2 p-0 m-0'>Your Pincode</p>
//                                 <div className="input-group mb-3 w-100 pincode_input">
//                                     <input type="text" className="form-control" aria-describedby="basic-addon2" />
//                                     <i className="ri-map-pin-line input-group-text" id="basic-addon2"></i>
//                                 </div> */}
//                                 {/* <p className='m-0'>
//                                     <span className='category_tag'>CATEGORIES:</span>
//                                     <span className='category_tag1'>{category}</span>
//                                 </p>
//                                 <p>
//                                     <span className='category_tag'>TAGS:</span>
//                                     <span className='category_tag1'>Bestsellers, Solitaire, Workwear</span>
//                                 </p> */}
//                                 {/* <p>
//                                     <span className='fw-bold' style={{ fontSize: "14px" }}>Share On:</span>
//                                     <i className="ri-facebook-circle-fill fs-2 pe-1 ps-2" style={{ color: "#0c5581" }}></i>
//                                     <i className="ri-whatsapp-fill fs-2 pe-1" style={{ color: "#46b63b" }}></i>
//                                     <i className="ri-telegram-fill fs-2 pe-1" style={{ color: "#1c90ca" }}></i>
//                                     <i className="ri-clipboard-fill fs-2 pe-1"></i>
//                                 </p> */}
//                                 <div>
//                                     <div className='row p-0 m-0 w-100 border rounded-3'>
//                                         <div className='col-lg-4 col-md-4 col-sm-4 col-4 m-0 p-0'>
//                                             <img alt='' src='data:image/jpeg;base64,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' className='img-fluid'></img>
//                                         </div>
//                                         <div className='col-lg-8 col-md-8 col-sm-8 col-8 video_call'>
//                                             <h6>Live Video Call</h6>
//                                             <p>Join a live video call with our consultants to see your favourite designs up close!</p>
//                                             <button
//                                                 className='btn'
//                                                 onClick={() => {
//                                                     const message = encodeURIComponent(
//                                                         "Hello, I would like to schedule a video call to see the designs."
//                                                     );
//                                                     const phoneNumber = ""; // Replace with your WhatsApp number including country code
//                                                     const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
//                                                     window.open(whatsappURL, "_blank"); // Opens WhatsApp in a new tab
//                                                 }}
//                                             >
//                                                 Schedule a Video Call
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/* <div className='mt-3'>
//                                     <div className='row m-0 p-0 w-100 border rounded-3 store py-2 my-2'>
//                                         <div className='col-lg-1 col-md-2 col-sm-2 col-2 m-0 p-0'>
//                                             <i className="ri-store-2-line fs-2 ps-2"></i>
//                                             <img alt='' src='assets/img/store.png' className='img-fluid'></img>
//                                         </div>
//                                         <div className='col-lg-11 col-md-10 col-sm-10 col-10'>
//                                             <h6>Nearest Store - <span className='fw-bold'>Adajan</span> (2km)</h6>
//                                             <p>Also Available in
//                                                 <span style={{ color: "#de57e5" }} className='fw-bold'> 2 Other Stores</span>
//                                             </p>
//                                         </div>
//                                         <button className='btn w-75 mx-auto d-block'>FIND IN STORE</button>
//                                     </div>
//                                 </div> */}
//                                 {/* <div className='border rounded-3 services  px-3 pt-3 mt-3'>
//                                     <div className=''>
//                                         <h6>Try at Home service is not available</h6>
//                                         <p>Browse other Designs</p>
//                                     </div>
//                                 </div> */}
//                                 <div className='certified_Sec mt-4'>
//                                     <div className='row'>
//                                         <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
//                                             {/* <img alt='' src='assets/img/cl-advantage-sprite (2).png' className='img-fluid mx-auto d-block w-50'></img> */}
//                                             <i className="ri-verified-badge-line fs-1"></i>
//                                             <p>100% <br />Certified</p>
//                                         </div>
//                                         <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
//                                             {/* <img alt='' src='assets/img/cl-advantage-sprite (1).png' className='img-fluid mx-auto d-block w-50'></img> */}
//                                             <i className="ri-replay-15-line fs-1"></i>
//                                             <p>15 Day <br />Money Back</p>
//                                         </div>
//                                         <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
//                                             {/* <img alt='' src='assets/img/cl-advantage-sprite (3).png' className='img-fluid mx-auto d-block w-50'></img> */}
//                                             <i className="ri-exchange-funds-line fs-1"></i>
//                                             <p>Lifetime Exchange</p>
//                                         </div>
//                                         <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
//                                             {/* <img alt='' src='assets/img/cl-advantage-sprite (4).png' className='img-fluid mx-auto d-block w-50'></img> */}
//                                             <i className="ri-calendar-line fs-1"></i>
//                                             <p>One Year Warranty</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/* <div className='rounded-3 policy_sec pt-3 px-3 pb-2 pt-4 mt-3'>
//                                     <h6>Earn 894 xCLusive points with this order</h6>
//                                     <p>(1 xClusive point = ₹1)</p>
//                                 </div> */}
//                                 <div className='mt-2'>
//                                     <p className='text-center' style={{ fontSize: "13px" }}>Learn more on about our <span className='fw-bold' style={{ color: "#de57e5" }}>TERMS & POLICIES</span></p>
//                                 </div>
//                                 <div className='mt-2'>
//                                     <div className='row text-center'>
//                                         <div className='col-lg-4 col-md-4 col-sm-6 col-12  mt-2'>
//                                             {/* <img alt='' src='assets/img/delivery.png' className='img-fluid mx-auto d-block'></img> */}
//                                             <i className="ri-discount-percent-line fs-1"></i>
//                                             <p className='p_main m-0 pt-2'>100% BIS</p>
//                                             <p style={{ fontSize: "11px" }}>Hallmarked Jewellery</p>
//                                         </div>
//                                         <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2'>
//                                             {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (3).png' className='img-fluid mx-auto d-block'></img> */}
//                                             <i className="ri-bubble-chart-line fs-1"></i>
//                                             <p className='m-0 pt-2  p_main'>Trust of Tanishq</p>
//                                             <p style={{ fontSize: "11px" }}>Titan Privileges</p>
//                                         </div>
//                                         <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2'>
//                                             <i className="ri-verified-badge-line fs-1 text-success"></i>
//                                             {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (2).png' className='img-fluid mx-auto d-block'></img> */}
//                                             <p className='m-0 pt-2 p_main'>100% Certified</p>
//                                             <p style={{ fontSize: "11px" }}>by CaratLane</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
// {/* =========Medium device========= */}
// <div className='row d-lg-none d-block'>
//     <div className='col-md-12 col-sm-12 col-12 mx-auto d-block'>
//         <h3>{title}</h3>
//         <h4 className='fw-bold'>{formatCurrency(adjustedPrice)}</h4>
//         <p className='m-0 p-0 title_taxes pt-2'>Price inclusive of taxes. See the full <span>price breakup</span></p>
//         <p className='title_offer'><i className="ri-discount-percent-line"></i>&nbsp;Special offer for you</p>
//         <p>
//             <span style={{ fontSize: "12px" }} className='fw-bold'>COLOR</span>
//             <span className='ps-3' style={{ fontSize: "20px" }}>
//                 {colors.map(color => (
//                     <i
//                         key={color.id}
//                         className="ri-circle-fill"
//                         style={{ color: color.color, fontSize: "20px", position: 'relative', cursor: 'pointer' }}
//                         onClick={() => handleColorClick(color.id)}
//                     >
//                         {selectedColor === color.id && (
//                             <i className="ri-check-line" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '12px' }}></i>
//                         )}
//                     </i>
//                 ))}
//             </span>
//         </p>
//         {/* <p>
//         <span className='fw-bold me-3' style={{ fontSize: "12px" }}>PURITY</span>
//         <button
//             className='btn mx-1 pt-2'
//             style={{
//                 fontSize: "11px",
//                 backgroundColor: selectedPurity === '14KT' ? '#ffcc00' : '#000',
//                 color: selectedPurity === '14KT' ? '#000' : '#fff'
//             }}
//             onClick={() => handleButtonClick('14KT')}
//         >
//             14 KT
//         </button>
//         <button
//             className='btn mx-1 pt-2'
//             style={{
//                 fontSize: "11px",
//                 backgroundColor: selectedPurity === '18KT' ? '#ffcc00' : '#000', // Change bg color when selected
//                 color: selectedPurity === '18KT' ? '#000' : '#fff' // Change text color to black when selected
//             }}
//             onClick={() => handleButtonClick('18KT')}
//         >
//             18 KT
//         </button>
//     </p> */}
//         <div className=" align-items-center customize_sec container-fluid">
//             <div className="row">
//                 <div className="col-12 border my-1 bg-white">
//                     <small className="text-muted">Size</small>
//                     <p className="fw-bold mb-0">
//                         {selectedSize ? `${selectedSize} inches` : "Select Size"}
//                     </p>
//                 </div>
//                 <div className="col-12 border my-1 px-2 py-1 bg-white">
//                     <small className="text-muted">Metal</small>
//                     <p className="fw-bold mb-0">{confirmedMetal}</p>
//                 </div>
//                 <div className="col-12 border my-1 px-2 py-1 bg-white">
//                     <small className="text-muted">Diamond</small>
//                     <p className="fw-bold mb-0">{confirmedDiamondQuality}</p>
//                 </div>
//             </div>
//         </div>
//         <button
//             className="btn w-100 align-middle  bg-warning"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#mdoffcanvassize"
//             aria-controls="offcanvassize"
//         >
//             CUSTOMISE
//         </button>
//         <button className='btn add_btn add_btn_md me-2 px-5 mt-3' onClick={addToCart}>
//             {/* <i className="ri-shopping-bag-4-line pe-2 fs-5"></i> */}
//             ADD TO CART
//         </button>
//         <button className='btn add_btn add_btn_md px-5 mt-3' onClick={buyNow}>
//             {/* <i className="ri-shopping-cart-2-line pe-2 fs-5"></i> */}
//             BUY NOW
//         </button>
//         {/* <p className='delivery_cancellation pt-4'>
//             <i className="ri-truck-line fs-5 pe-2"></i>
//             <u> DELIVERY & CANCELLATION ESTIMATED DELIVERY BY 3RD SEP 2024</u>
//         </p> */}
//         {/* <p className='pincode_productdetail pt-2 p-0 m-0'>Your Pincode</p>
//         <div className="input-group mb-3 w-100 pincode_input">
//             <input type="text" className="form-control" aria-describedby="basic-addon2" />
//             <i className="ri-map-pin-line input-group-text" id="basic-addon2"></i>
//         </div> */}
//         {/* <p className='m-0'>
//             <span className='category_tag'>CATEGORIES:</span>
//             <span className='category_tag1'>Bracelet</span>
//         </p>
//         <p>
//             <span className='category_tag'>TAGS:</span>
//             <span className='category_tag1'>Bestsellers, Solitaire, Workwear</span>
//         </p>
//         <p>
//             <span className='fw-bold' style={{ fontSize: "14px" }}>Share On:</span>
//             <i className="ri-facebook-circle-fill fs-2 pe-1 ps-2" style={{ color: "#0c5581" }}></i>
//             <i className="ri-whatsapp-fill fs-2 pe-1" style={{ color: "#46b63b" }}></i>
//             <i className="ri-telegram-fill fs-2 pe-1" style={{ color: "#1c90ca" }}></i>
//             <i className="ri-clipboard-fill fs-2 pe-1"></i>
//         </p> */}
//         <div className='ps-3'>
//             <div className='row w-100 border rounded-3'>
//                 <div className='col-lg-4 col-md-4 col-sm-4 col-4 m-0 p-0'>
//                     <img alt='' src='data:image/jpeg;base64,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' className='img-fluid video_call_img'></img>
//                 </div>
//                 <div className='col-lg-8 col-md-8 col-sm-8 col-8 video_call'>
//                     <h6>Live Video Call</h6>
//                     <p>Join a live video call with our consultants to see your favourite designs up close!</p>
//                     <button
//                         className='btn'
//                         onClick={() => {
//                             const message = encodeURIComponent(
//                                 "Hello, I would like to schedule a video call to see the designs."
//                             );
//                             const phoneNumber = ""; // Replace with your WhatsApp number including country code
//                             const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
//                             window.open(whatsappURL, "_blank"); // Opens WhatsApp in a new tab
//                         }}
//                     >
//                         Schedule a Video Call
//                     </button>
//                 </div>

//             </div>
//         </div>
//         {/* <div className='mt-3 ps-3'>
//             <div className='row w-100 border rounded-3 store py-2 my-2'>
//                 <div className='col-md-1 col-sm-1 col-2 m-0 p-0'>
//                     <i className="ri-store-2-line fs-1 ps-2"></i>
//                     <img alt='' src='assets/img/store.png' className='img-fluid'></img>
//                 </div>
//                 <div className='col-md-11 col-sm-11 col-10'>
//                     <h6>Nearest Store - <span className='fw-bold'>Adajan</span> (2km)</h6>
//                     <p>Also Available in
//                         <span style={{ color: "#de57e5" }} className='fw-bold'> 2 Other Stores</span>
//                     </p>
//                 </div>
//                 <button className='btn w-75 mx-auto d-block'>FIND IN STORE</button>
//             </div>
//         </div>
//         <div className='border rounded-3 services me-2 px-3 pt-3 mt-3'>
//             <div className=''>
//                 <h6>Try at Home service is not available</h6>
//                 <p>Browse other Designs</p>
//             </div>
//         </div> */}
//         <div className='certified_Sec mt-4'>
//             <div className='row'>
//                 <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
//                     {/* <img alt='' src='assets/img/cl-advantage-sprite (2).png' className='img-fluid mx-auto d-block w-50'></img> */}
//                     <i className="ri-verified-badge-line fs-1"></i>
//                     <p>100% <br />Certified</p>
//                 </div>
//                 <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
//                     {/* <img alt='' src='assets/img/cl-advantage-sprite (1).png' className='img-fluid mx-auto d-block w-50'></img> */}
//                     <i className="ri-replay-15-line fs-1"></i>
//                     <p>15 Day <br />Money Back</p>
//                 </div>
//                 <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
//                     {/* <img alt='' src='assets/img/cl-advantage-sprite (3).png' className='img-fluid mx-auto d-block w-50'></img> */}
//                     <i className="ri-exchange-funds-line fs-1"></i>
//                     <p>Lifetime Exchange</p>
//                 </div>
//                 <div className='col-lg-3 col-md-3 col-sm-6 col-6 text-center'>
//                     {/* <img alt='' src='assets/img/cl-advantage-sprite (4).png' className='img-fluid mx-auto d-block w-50'></img> */}
//                     <i className="ri-calendar-line fs-1"></i>
//                     <p>One Year Warranty</p>
//                 </div>
//             </div>
//         </div>
//         {/* <div className='rounded-3 policy_sec pt-3 px-3 pb-2 pt-4 mt-3'>
//             <h6>Earn 894 xCLusive points with this order</h6>
//             <p>(1 xClusive point = ₹1)</p>
//         </div> */}
//         <div className='mt-2'>
//             <p className='text-center' style={{ fontSize: "13px" }}>Learn more on about our <span className='fw-bold' style={{ color: "#de57e5" }}>TERMS & POLICIES</span></p>
//         </div>
//         <div className='mt-2'>
//             <div className='row text-center'>
//                 <div className='col-lg-4 col-md-4 col-sm-4 col-4  mt-2'>
//                     {/* <img alt='' src='assets/img/delivery.png' className='img-fluid mx-auto d-block'></img> */}
//                     <i className="ri-discount-percent-line fs-1"></i>
//                     <p className='p_main m-0 pt-2'>100% BIS</p>
//                     <p style={{ fontSize: "11px" }}>Hallmarked Jewellery</p>
//                 </div>
//                 <div className='col-lg-4 col-md-4 col-sm-4 col-4 mt-2'>
//                     {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (3).png' className='img-fluid mx-auto d-block'></img> */}
//                     <i className="ri-bubble-chart-line fs-1"></i>
//                     <p className='m-0 pt-2  p_main'>Trust of Tanishq</p>
//                     <p style={{ fontSize: "11px" }}>Titan Privileges</p>
//                 </div>
//                 <div className='col-lg-4 col-md-4 col-sm-4 col-4 mt-2'>
//                     <i className="ri-verified-badge-line fs-1 text-success"></i>
//                     {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (2).png' className='img-fluid mx-auto d-block'></img> */}
//                     <p className='m-0 pt-2 p_main'>100% Certified</p>
//                     <p style={{ fontSize: "11px" }}>by CaratLane</p>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
//     </div>
// </section>
//                 <section className='container-fluid py-3'>
//                     <div>
//                         <div className='row'>
//                             <div className='col-xl-8'>
//                                 {/* <h5>PRODUCT DETAILS</h5> */}
//                                 <div className="section product-details">
//                                     <h3>Product Details</h3>
//                                     <div className="grid">
//                                         <div className="detail-box">
//                                             <h4>Weight</h4>
//                                             <p className='m-0 p-0 mb-2'>Gross (Product): 3.316 gram</p>
//                                             <p>Net (Gold): 2.940 gram</p>
//                                         </div>
//                                         <div className="detail-box">
//                                             <h4>Purity</h4>
//                                             <p>14Kt Yellow Gold</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="diamonds-gemstones">
//                                     <h3>Diamond & Gemstones</h3>
//                                     <p>Weight: 1.880 Ct</p>
//                                     <div className="table-responsive">
//                                         <table>
//                                             <thead>
//                                                 <tr>
//                                                     <th>Size</th>
//                                                     <th>Color</th>
//                                                     <th>Clarity</th>
//                                                     <th>Shape</th>
//                                                     <th>No. of Diamonds</th>
//                                                     <th>Total Weight</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 <tr>
//                                                     <td>0.01 to 0.07</td>
//                                                     <td>GH</td>
//                                                     <td>VS</td>
//                                                     <td>Round</td>
//                                                     <td>38</td>
//                                                     <td>0.380</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td>1.50 to 1.99</td>
//                                                     <td>G</td>
//                                                     <td>VS1</td>
//                                                     <td>Emerald</td>
//                                                     <td>1</td>
//                                                     <td>1.500</td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                                 <div className="section price-breakup pt-3">
//                                     <h3>Price Breakup</h3>
//                                     <ul className='ps-0'>
//                                         <p className='m-0 p-0'>
//                                             <span className='price_break'>Gold:</span>
//                                             <span className='price_break_price text_end_break'>₹13,856/-</span>
//                                         </p>
//                                         <p className='m-0 p-0'>
//                                             <span className='price_break'>Diamond:</span>
//                                             <span className='price_break_price text_end_break'>₹99,500/-</span>
//                                         </p>
//                                         <p className='m-0 p-0'>
//                                             <span className='price_break'>Making Charge:</span>
//                                             <span className='price_break_price text_end_break'>₹4,410/-</span>
//                                         </p>
//                                         <p className='m-0 p-0'>
//                                             <span className='price_break'>GST:</span>
//                                             <span className='price_break_price text_end_break'>₹3,532/-</span>
//                                         </p>
//                                         <p className='m-0 p-0'>
//                                             <span className='price_break'>Total:</span>
//                                             <span className='price_break_price text_end_break'>₹1,21,299/-</span>
//                                         </p>
//                                     </ul>
//                                 </div>

//                             </div>
//                             <div className='col-xl-4'>

//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 {/* ============you may also like============= */}
//                 <section className='container my-3'>
//                     <h3 className='text-center pb-4 font_main'>You may also Like</h3>
//                     <div className='row mb-4'>
//                         {
//                             allProduct.map((item) => {
//                                 return <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 card_shadow' key={item.id}>
//                                     <ProductCard Productsitem={item} />
//                                 </div>
//                             })
//                         }
//                     </div>

//                     <h3 className='text-center py-4 font_main'>Recently Viewed</h3>
//                     <div className="row position-relative mb-4">
//                         {recentlyViewed.length > 0 ? (
//                             <>
//                                 {/* Prev Button */}
//                                 {currentIndex > 0 && (
//                                     <div>
//                                         <button
//                                             onClick={() => search?.current?.slickPrev()}
//                                             className="pre-btn-set"
//                                         >
//                                             <i className="ri-arrow-left-wide-line"></i>
//                                         </button>
//                                     </div>
//                                 )}

//                                 <Slider ref={search} {...slider_search}>
//                                     {recentlyViewed.map((item) => (
//                                         <div
//                                             className="card border-0 w-100 mx-auto d-block"
//                                             key={item.id}
//                                         >
//                                             <Link to={`/productDetail/${item.id}`}>
//                                                 <img
//                                                     alt={item.title}
//                                                     src={item.image01}
//                                                     className="img-fluid px-2 position-relative"
//                                                 />
//                                             </Link>
//                                             <div className="card-body cartlane">
//                                                 <h6>
//                                                     {formatCurrency(item.price)}{" "}
//                                                     <span>
//                                                         <del>{formatCurrency(item.delprice)}</del>
//                                                     </span>
//                                                 </h6>
//                                                 <p>{item.title}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </Slider>

//                                 {/* Next Button */}
//                                 {currentIndex < recentlyViewed.length - slider_search.slidesToShow && (
//                                     <div>
//                                         <button
//                                             onClick={() => search?.current?.slickNext()}
//                                             className="next-btn-set float-end"
//                                         >
//                                             <i className="ri-arrow-right-wide-line"></i>
//                                         </button>
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             <div className="text-center w-100 pt-5">
//                                 <p>You haven't viewed any products yet. Start exploring now!</p>
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 {/* Large Offcanvas */}
//                 <div className="offcanvas offcanvas-end offcanvas_end_size" tabIndex="-1" id="offcanvassize" aria-labelledby="offcanvassizeLabel">
//                     <div className="offcanvas-header offcanvas_size_header d-flex justify-content-between align-items-center">
//                         <div className="text-start pt-5">
//                             <p className='m-0 p-0'>Estimated price</p>
//                             <span className="fw-bold" style={{ fontSize: "18px" }}>{formatCurrency(adjustedPrice)}&nbsp;</span>
//                             <span className="text-decoration-line-through text-muted">{formatCurrency(delprice)}</span>
//                         </div>
//                         <div className="text-end">
//                             <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                             {/* <div className='pt-3 delivery_size'>
//                                 <p className='m-0 p-0'>Delivery By</p>
//                                 <span className="fw-bold">14th Oct</span>
//                             </div> */}

//                         </div>
//                     </div>

//                     <div className="offcanvas-body offcanvas_body_size">
//                         {/* Choice of Metal */}
//                         <div className="mb-2 metal_offcanvas">
//                             <h6 className="font_h mb-3">Choice of Metal</h6>
//                             <div className="row g-3">
//                                 {/* Metal Options */}
//                                 {metalOptions.map((item, index) => (
//                                     <div key={index} className="col-3">
//                                         <button
//                                             className={`btn size-btn w-100 p-3 ${selectedMetal === item.metal ? 'selected' : ''}`}
//                                             onClick={() => handleMetalClick(item.metal)}
//                                         >
//                                             <p>{item.metal}</p>
//                                             <small className="text-muted d-block">in Stock!</small>
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Diamond Quality */}
//                         <div className="mb-2">
//                             <div className="d-flex justify-content-between align-items-center mb-3">
//                                 <h6 className="font_h">Diamond Quality</h6>
//                                 <Link to="">Diamond Guide</Link>
//                             </div>
//                             <div className="row g-3 diamond_offcanvas">
//                                 {diamondOptions.map((item, index) => (
//                                     <div key={index} className="col-3">
//                                         <button
//                                             className={`btn size-btn w-100 p-3 ${selectedDiamondQuality === item.quality ? 'selected' : ''}`}
//                                             onClick={() => handleDiamondQualityClick(item.quality)}
//                                         >
//                                             <p className="fw-bold m-0 p-0">{item.quality}</p>
//                                             <small>{item.status}</small>
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Select Size */}
//                         <div className="mb-2">
//                             <div className="d-flex justify-content-between align-items-center mb-4">
//                                 <h6 className="font_h">Select Size</h6>
//                                 <Link to="">Size Guide</Link>
//                             </div>
//                             <div className="row g-3 size_offcanvas">
//                                 {/* Size buttons */}
//                                 {sizeOptions.map((item) => (
//                                     <div key={item.size} className="col-3">
//                                         <button
//                                             className={`btn size-btn w-100 p-2 ${selectedSize === item.size ? 'selected' : ''}`}
//                                             onClick={() => handleSizeClick(item.size)}
//                                         >
//                                             <p className="fw-bold m-0 p-0">{item.size} inches</p>
//                                             <p className="text-muted m-0 p-0" style={{ fontSize: "10px" }}>{item.mm}</p>
//                                             <small>{item.stock}</small>
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="offcanvas-footer text-center offcanvas_size_btn" data-bs-dismiss="offcanvas" aria-label="Close">
//                         <button className="btn w-100 py-3 fw-bold text-uppercase" onClick={handleConfirm}>Confirm Customisation</button>
//                     </div>
//                 </div>
//                 {/* Md Offcanvas */}
//                 <div className="offcanvas offcanvas-bottom offcanvas_bottom_size" tabIndex="-1" id="mdoffcanvassize" aria-labelledby="mdoffcanvassizeLabel">
//                     <div className="offcanvas-header offcanvas_size_header d-flex justify-content-between align-items-center">
//                         <div className="text-start pt-5">
//                             <p className='m-0 p-0'>Estimated price</p>
//                             <span className="fw-bold" style={{ fontSize: "18px" }}>{formatCurrency(adjustedPrice)}&nbsp;</span>
//                             <span className="text-decoration-line-through text-muted">{formatCurrency(delprice)}</span>
//                         </div>
//                         <div className="text-end">
//                             <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                             {/* <div className='pt-3 delivery_size'>
//                                 <p className='m-0 p-0'>Delivery By</p>
//                                 <span className="fw-bold">14th Oct</span>
//                             </div> */}

//                         </div>
//                     </div>

//                     <div className="offcanvas-body offcanvas_body_size">
//                         {/* Choice of Metal */}
//                         <div className="mb-2 metal_offcanvas">
//                             <h6 className="font_h mb-3">Choice of Metal</h6>
//                             <div className="row g-3">
//                                 {/* Metal Options */}
//                                 {metalOptions.map((item, index) => (
//                                     <div key={index} className="col-3">
//                                         <button
//                                             className={`btn size-btn w-100 p-3 ${selectedMetal === item.metal ? 'selected' : ''}`}
//                                             onClick={() => handleMetalClick(item.metal)}
//                                         >
//                                             <p>{item.metal}</p>
//                                             <small className="text-muted d-block">in Stock!</small>
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         {/* Diamond Quality */}
//                         <div className="mb-2">
//                             <div className="d-flex justify-content-between align-items-center mb-3">
//                                 <h6 className="font_h">Diamond Quality</h6>
//                                 <Link to="">Diamond Guide</Link>
//                             </div>
//                             <div className="row g-3 diamond_offcanvas">
//                                 {diamondOptions.map((item, index) => (
//                                     <div key={index} className="col-3">
//                                         <button
//                                             className={`btn size-btn w-100 p-3 ${selectedDiamondQuality === item.quality ? 'selected' : ''}`}
//                                             onClick={() => handleDiamondQualityClick(item.quality)}
//                                         >
//                                             <p className="fw-bold m-0 p-0">{item.quality}</p>
//                                             <small>{item.status}</small>
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Select Size */}
//                         <div className="mb-2">
//                             <div className="d-flex justify-content-between align-items-center mb-4">
//                                 <h6 className="font_h">Select Size</h6>
//                                 <Link to="">Size Guide</Link>
//                             </div>
//                             <div className="row g-3 size_offcanvas">
//                                 {/* Size buttons */}
//                                 {sizeOptions.map((item) => (
//                                     <div key={item.size} className="col-3">
//                                         <button
//                                             className={`btn size-btn w-100 p-2 ${selectedSize === item.size ? 'selected' : ''}`}
//                                             onClick={() => handleSizeClick(item.size)}
//                                         >
//                                             <p className="fw-bold m-0 p-0">{item.size} inches</p>
//                                             <p className="text-muted m-0 p-0" style={{ fontSize: "10px" }}>{item.mm}</p>
//                                             <small>{item.stock}</small>
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="offcanvas-footer text-center offcanvas_size_btn" data-bs-dismiss="offcanvas" aria-label="Close">
//                         <button className="btn w-100 py-3 fw-bold text-uppercase" onClick={handleConfirm}>Confirm Customisation</button>
//                     </div>
//                 </div>
//             </>
//         </Helmet>
//     )
// }

// export default Productdetails



// Productdetails.js
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { formatCurrency } from "../../Utils/formateCurrency";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from '../../Store/Slice/CartSlice';


const Productdetails = () => {
    const search = React.useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Get the product ID from the URL
    const [selectedColor, setSelectedColor] = useState(2);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [price, setPrice] = useState(null);
    const [selectedSize, setSelectedSize] = useState(''); // To track selected size
    const [tempPrice, setTempPrice] = useState(price); // Temporary price for selected size
    const [adjustedPrice, setAdjustedPrice] = useState(price); // Final price
    const [selectedKT, setSelectedKT] = useState("14KT"); // Default selection is 14KT
    const [isValidSize, setIsValidSize] = useState(true);
    const [ringSize, setRingSize] = useState(6);
    const [showClear, setShowClear] = useState(true);
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    // useEffect(() => {
    //     dispatch(cartAction.addRecentlyViewed(product));
    //     // eslint-disable-next-line react-hooks/exhaustive-deps 
    // }, [dispatch]);

    // recently viewd
    // const recentlyViewed = useSelector(state => state.cart.recentlyViewed);
    useEffect(() => {
        const fetchRecentlyViewed = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/recently-viewed');
            const data = await response.json();
            setRecentlyViewed(data);
          } catch (error) {
            console.error('Error fetching recently viewed products:', error);
          }
        };
    
        fetchRecentlyViewed();
      }, []);    

    useEffect(() => {
        // Set initial price based on the selectedKT
        let basePrice = selectedKT === "14KT" ? product.total14KT : product.total18KT;
    
        // Calculate price for the default or selected size
        const sizeDiff = ringSize !== "choose" ? parseInt(ringSize, 10) - 6 : 0;
        const priceAdjustment = 0.02 * basePrice * sizeDiff;
        setPrice(basePrice + priceAdjustment);
    }, [selectedKT, product, ringSize]);
    
    const handleSizeChange = (e) => {
        const size = e.target.value; // Get selected size
        setRingSize(size); // Update ringSize state
        setIsValidSize(size !== 'choose');
    
        // Calculate the price based on size
        let basePrice = selectedKT === "14KT" ? product.total14KT : product.total18KT;
    
        if (size !== "choose") {
            const sizeDiff = parseInt(size, 10) - 6;
            const priceAdjustment = 0.02 * basePrice * sizeDiff;
            setPrice(basePrice + priceAdjustment);
            setShowClear(true); // Show the Clear button
        } else {
            setPrice(basePrice); // Reset to the base price
            setShowClear(false); // Hide the Clear button
        }
    };
    
    const handleClear = () => {
        setRingSize("choose"); // Reset the selected size to "choose"
        setIsValidSize(false);
        setPrice(selectedKT === "14KT" ? product.total14KT : product.total18KT); // Reset price to base price
        setShowClear(false); // Hide the Clear button
    };

    const slider_search = {
        slidesToShow: 5, // Default: Show 5 slides
        slidesToScroll: 1, // Scroll one at a time
        infinite: false, // Disable infinite scrolling
        afterChange: (index) => setCurrentIndex(index), // Track index after change
        responsive: [
            {
                breakpoint: 1200, // For devices with width <= 1200px
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992, // For devices with width <= 992px
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768, // For devices with width <= 768px
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 576, // For devices with width <= 576px
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };
    const sizeOptions = useMemo(() => [
        { size: 5, mm: "44.8 mm", stock: "Made to Order", price: Math.round(price * 0.95) },
        { size: 6, mm: "45.9 mm", stock: "Made to Order", price: Math.round(price * 0.96) },
        { size: 7, mm: "47.1 mm", stock: "Only 4 left!", price: Math.round(price * 0.97) },
        { size: 8, mm: "48.1 mm", stock: "In Stock!", price: price }
    ], [price]);


    const metalOptions = useMemo(() => [
        { metal: '18KT Yellow Gold', price: Math.round(price * 1.10) }, // 10% more
        { metal: '14KT White Gold', price: price }, // No change for 14KT White Gold
        { metal: '16KT Rose Gold', price: Math.round(price * 1.07) } // 7% more
    ], [price]);

    const diamondOptions = [
        { quality: "IJ-SI", status: "Only 4 left!", price: Math.round(price * 1.02) }, // 2% more
        { quality: "GH-VS", status: "Made to Order", price: Math.round(price * 1.04) }, // 4% more
        { quality: "GH-VVS", status: "Made to Order", price: Math.round(price * 1.06) }, // 6% more
        { quality: "EF-VVS", status: "Made to Order", price: Math.round(price * 1.08) }, // 8% more
        { quality: "GH-SI", status: "In Stock!", price: price } // No change for GH-SI
    ];

    const [selectedMetal, setSelectedMetal] = useState(metalOptions[1].metal); // Track selected metal
    const [confirmedMetal, setConfirmedMetal] = useState(metalOptions[1].metal); // Confirmed metal

    const [selectedDiamondQuality, setSelectedDiamondQuality] = useState(diamondOptions[4].quality); // Default selection
    const [confirmedDiamondQuality, setConfirmedDiamondQuality] = useState(diamondOptions[4].quality); // Confirmed quality with default


    useEffect(() => {
        const defaultSize = sizeOptions[3].size;  // Set default size to the specified option
        setSelectedSize(defaultSize);

        const selectedSizeData = sizeOptions.find((s) => s.size === defaultSize);
        setTempPrice(selectedSizeData ? selectedSizeData.price : price);
    }, [price, sizeOptions]);


    const calculateTempPrice = (sizePrice, metalPrice, diamondPrice) => {
        return sizePrice + metalPrice + diamondPrice - price;
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
        const selectedSizeData = sizeOptions.find((s) => s.size === size);
        const selectedMetalData = metalOptions.find((m) => m.metal === selectedMetal);
        const selectedDiamondData = diamondOptions.find((d) => d.quality === selectedDiamondQuality);

        setTempPrice(calculateTempPrice(
            selectedSizeData ? selectedSizeData.price : price,
            selectedMetalData ? selectedMetalData.price : 0,
            selectedDiamondData ? selectedDiamondData.price : 0
        ));
    };

    // useEffect(() => {
    // const fetchProductDetails = async () => {
    //     try {
    //         const response = await axios.get(`https://saltandglitzapi-rkm5g.kinsta.app/v1/upload/get_id/${id}`);
    //         console.log(id);



    //         setProduct(response.data); // Set product details in state
    //         console.log(response.data);
    //     } catch (err) {
    //         console.error("Error fetching product details:", err.response || err);
    //         setError("Failed to load product details.");
    //     } finally {
    //         setLoading(false); // Stop loader
    //     }
    // };
    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/v1/upload/get_id/${id}`);
            const data = response.data;

            // Map data from Excel file
            setProduct({
                title: data.title,
                grossWt: data.grossWt,
                netWeight14KT: data.netWeight14KT,
                netWeight18KT: data.netWeight18KT,
                makingCharge14KT: data.makingCharge14KT,
                makingCharge18KT: data.makingCharge18KT,
                gst14KT: data.gst14KT,
                gst18KT: data.gst18KT,
                total14KT: data.total14KT,
                total18KT: data.total18KT,
                price14KT: data.price14KT,
                price18KT: data.price18KT,
                diamondprice: data.diamondprice
            });
        } catch (err) {
            console.error("Error fetching product details:", err.response || err);
            setError("Failed to load product details.");
        } finally {
            setLoading(false); // Stop loader
        }
    };

    useEffect(() => {
        fetchProductDetails()
    }, [id])

    // Handle KT button click
    const handleKTClick = (ktType) => {
        setSelectedKT(ktType);
    };
    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;
    var md_carousel = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const colors = [
        { id: 1, color: "#ffcccc" },
        { id: 2, color: "#cccccc" },
        { id: 3, color: "#ffcc66" }
    ]

    const handleColorClick = (colorId) => {
        setSelectedColor(selectedColor === colorId ? null : colorId);
    };
    const imagesByColor = {
        1: [
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_1_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_3_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_5_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_4_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_7_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_16_video.mp4",
        ],
        2: [
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_5_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_3_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_1_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_7_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_4_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_16_video.mp4",
        ],
        3: [
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_4_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_7_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_1_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_3_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_5_lar.jpg",
            "https://cdn.caratlane.com/media/catalog/product/J/R/JR08210-PTP600_16_video.mp4",
        ],
    };

    const addToCart = async () => {
        setLoading(true);

        const cartItem = {
            id: product.id, // Ensure `product` has these properties
            title: product.title,
            price: product.price, // Use the original price or calculated price
            image01: product.img, // Assuming product.img is the main image
            totalprice: product.price,
            selectedSize: "defaultSize", // Replace with actual size if available
            confirmedMetal: "defaultMetal", // Replace with selected metal if applicable
            confirmedDiamondQuality: "defaultDiamondQuality" // Replace with diamond quality if applicable
        };

        try {
            const response = await axios.post('https://saltandglitzapi-rkm5g.kinsta.app/v1/cart/addCart', cartItem);

            if (response.status === 201) {
                toast.success("Product added to cart successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(cartAction.addItem(response.data)); // Assuming cartAction is correctly imported
            } else {
                toast.error("Failed to add product to cart!");
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast.error("An error occurred while adding to cart!");
        } finally {
            setLoading(false);
        }
    };

    const buyNow = async () => {
        setLoading(true);

        const cartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image01: product.img,
            totalprice: product.price
        };

        try {
            const response = await axios.post('https://saltandglitzapi-rkm5g.kinsta.app/v1/carts/add', cartItem);

            if (response.status === 201) {
                dispatch(cartAction.addItem(response.data));
                toast.success("Redirecting to cart...");
                setTimeout(() => {
                    setLoading(false);
                    navigate('/cart'); // Ensure `navigate` is imported from `react-router-dom`
                }, 2000);
            } else {
                toast.error("Failed to add product to cart!");
            }
        } catch (error) {
            console.error('Error buying item:', error);
            toast.error("An error occurred during checkout!");
        } finally {
            setLoading(false);
        }
    };
    const handleMetalClick = (metal) => {
        setSelectedMetal(metal);
        const selectedSizeData = sizeOptions.find((s) => s.size === selectedSize);
        const selectedMetalData = metalOptions.find((m) => m.metal === metal);
        const selectedDiamondData = diamondOptions.find((d) => d.quality === selectedDiamondQuality);

        setTempPrice(calculateTempPrice(
            selectedSizeData ? selectedSizeData.price : price,
            selectedMetalData ? selectedMetalData.price : 0,
            selectedDiamondData ? selectedDiamondData.price : 0
        ));
    };

    const handleDiamondQualityClick = (quality) => {
        setSelectedDiamondQuality(quality);
        const selectedSizeData = sizeOptions.find((s) => s.size === selectedSize);
        const selectedMetalData = metalOptions.find((m) => m.metal === selectedMetal);
        const selectedDiamondData = diamondOptions.find((d) => d.quality === quality);

        setTempPrice(calculateTempPrice(
            selectedSizeData ? selectedSizeData.price : price,
            selectedMetalData ? selectedMetalData.price : 0,
            selectedDiamondData ? selectedDiamondData.price : 0
        ));
    };
    // CONFIRM BUTTON
    const handleConfirm = () => {
        setAdjustedPrice(tempPrice);
        setConfirmedMetal(selectedMetal);
        setConfirmedDiamondQuality(selectedDiamondQuality);

        const offcanvas = document.getElementById('offcanvassize', 'offcanvasmetal', 'offcanvasDiamond');
        const offcanvasInstance = new window.bootstrap.Offcanvas(offcanvas);
        offcanvasInstance.hide();
    };
    return (
        <div>
            <section className='container-fluid pb-4 pt-2'>
                <div>
                    <div className='row '>
                        <div className="col-lg-8 col-md-6 col-sm-12 col-12 m-0 p-0  d-lg-block d-none">
                            <div className="row">
                                {selectedColor && imagesByColor[selectedColor]?.map((src, index) => (
                                    <div key={index} className="col-lg-6 col-md-6 col-sm-12 col-12 m-0 p-0">
                                        {src.includes(".mp4") ? (
                                            <video
                                                autoPlay
                                                loop
                                                controls
                                                muted
                                                style={{ width: "100%" }}
                                                className='item1 video p-1'
                                            >
                                                <source src={src} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <img alt="" src={src} className="img-fluid p-1" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <section className='container-fluid m-0 p-0 mb-5 d-lg-none d-block'>
                            <Slider {...md_carousel}>
                                {selectedColor && imagesByColor[selectedColor]?.map((src, index) => (
                                    <div key={index} >
                                        {src.includes(".mp4") ? (
                                            <video
                                                autoPlay
                                                loop
                                                controls
                                                muted
                                                style={{ width: "100%" }}
                                                className='item1 video p-1'
                                            >
                                                <source src={src} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <img alt="" src={src} className="img-fluid p-1" />
                                        )}
                                    </div>
                                ))}
                            </Slider>
                        </section>
                        {/* Large */}
                        <div className='col-lg-4 col-md-6 col-sm-12 col-12 px-4 mt-4 mx-auto d-block d-lg-block d-none sticky-header'>
                            <h3 className='font_h'>{product.title}</h3>
                            <h4 className='font_h'>{formatCurrency(price)}</h4>
                            <p className='m-0 p-0 title_taxes pt-2'>Price inclusive of taxes. See the full <span>price breakup</span></p>
                            <p className='title_offer'><i className="ri-discount-percent-line"></i>&nbsp;Special offer for you</p>

                            <p className="KT_button">
                                <span className=" align-middle">
                                    color
                                </span>
                                <span className="ps-3 align-middle" style={{ fontSize: "20px" }}>
                                    {colors.map((color) => (
                                        <i
                                            key={color.id}
                                            className="ri-circle-fill"
                                            style={{
                                                color: color.color,
                                                fontSize: "20px",
                                                position: "relative",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleColorClick(color.id)}
                                        >
                                            {selectedColor === color.id && (
                                                <i
                                                    className="ri-check-line"
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform: "translate(-50%, -50%)",
                                                        color: "#fff",
                                                        fontSize: "12px",
                                                    }}
                                                ></i>
                                            )}
                                        </i>
                                    ))}
                                </span>
                            </p>

                            {/* KT Selection Buttons */}
                            <div className="my-3 KT_button">
                                <span className="align-middle pe-3">
                                    Purity
                                </span>
                                <button
                                    className={`btn ${selectedKT === "14KT" ? "bg-dark text-light" : "btn-light text-dark"
                                        } me-2`}
                                    onClick={() => handleKTClick("14KT")}
                                >
                                    14KT
                                </button>
                                <button
                                    className={`btn ${selectedKT === "18KT" ? "bg-dark text-light" : "btn-light text-dark"
                                        } me-2`}
                                    onClick={() => handleKTClick("18KT")}
                                >
                                    18KT
                                </button>
                            </div>
                            <div className="my-3 KT_button d-flex align-items-center">
                                <span className="pe-3">Ring Size</span>
                                <select
                                    className="form-select d-inline w-auto"
                                    value={ringSize} // Bind the ringSize state
                                    onChange={handleSizeChange}
                                >
                                    <option value="choose">Choose</option>
                                    {[...Array(21)].map((_, i) => (
                                        <option key={i} value={i + 6}>
                                            {i + 6}
                                        </option>
                                    ))}
                                </select>
                                {showClear && ( // Show Clear button only if showClear is true
                                    <button
                                        className="btn btn-link ms-3 bg-white text-decoration-none text-dark"
                                        type="button"
                                        onClick={handleClear}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            {/* <p className="d-flex align-items-center customize_sec">
                                <div className="w-25 border-end px-2 py-1 bg-white" style={{ borderRadius: "10px 0px 0px 10px" }}>
                                    <small className="text-muted">Size</small>
                                    <p className="fw-bold mb-0">{selectedSize ? `${selectedSize} inches` : "Select Size"}</p>
                                </div>
                                <div className="w-25 border-end px-2 py-1 bg-white">
                                    <small className="text-muted">Metal</small>
                                    <p className="fw-bold mb-0">{confirmedMetal}</p>
                                </div>
                                <div className="w-25 border-end px-2 py-1 bg-white">
                                    <small className="text-muted">Diamond</small>
                                    <p className="fw-bold mb-0">{confirmedDiamondQuality}</p>
                                </div>
                                <div className="w-25">
                                    <button
                                        className="btn w-100 text-warning fw-bold"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvassize"
                                        aria-controls="offcanvassize"
                                    >
                                        CUSTOMISE
                                    </button>
                                </div>
                            </p> */}
                            <button className='btn add_btn me-2 my-3' onClick={addToCart} disabled={!isValidSize}>
                                {/* <i className="ri-shopping-bag-4-line pe-2 fs-5"></i> */}
                                ADD TO CART
                            </button>
                            <button className='btn add_btn my-3 me-2' onClick={buyNow} disabled={!isValidSize}>
                                {/* <i className="ri-shopping-cart-2-line pe-2 fs-5"></i> */}
                                BUY NOW
                            </button>
                            <button className='btn wish_btn my-3'>
                                <i className="fa-regular fa-heart fs-5"></i>
                            </button>

                            <div>
                                <div className='row p-0 m-0 w-100 border rounded-3'>
                                    <div className='col-lg-4 col-md-4 col-sm-4 col-4 m-0 p-0'>
                                        <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/03-MAR/Others/CLlive/TOPBanner.png' className='img-fluid w-100 h-100'></img>
                                    </div>
                                    <div className='col-lg-8 col-md-8 col-sm-8 col-8 video_call'>
                                        <h6>Live Video Call</h6>
                                        <p>Join a live video call with our consultants to see your favourite designs up close!</p>
                                        <button
                                            className='btn'
                                            onClick={() => {
                                                const message = encodeURIComponent(
                                                    "Hello, I would like to schedule a video call to see the designs."
                                                );
                                                const phoneNumber = ""; // Replace with your WhatsApp number including country code
                                                const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
                                                window.open(whatsappURL, "_blank"); // Opens WhatsApp in a new tab
                                            }}
                                        >
                                            Schedule a Video Call
                                        </button>
                                    </div>
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
                            <div className='mt-2'>
                                <p className='text-center' style={{ fontSize: "13px" }}>Learn more on about our <span className='fw-bold' style={{ color: "#de57e5" }}>TERMS & POLICIES</span></p>
                            </div>
                            <div className='mt-2'>
                                <div className='row text-center'>
                                    <div className='col-lg-4 col-md-4 col-sm-6 col-12  mt-2'>
                                        {/* <img alt='' src='assets/img/delivery.png' className='img-fluid mx-auto d-block'></img> */}
                                        <i className="ri-discount-percent-line fs-1"></i>
                                        <p className='p_main m-0 pt-2'>100% BIS</p>
                                        <p style={{ fontSize: "11px" }}>Hallmarked Jewellery</p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2'>
                                        {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (3).png' className='img-fluid mx-auto d-block'></img> */}
                                        <i className="ri-bubble-chart-line fs-1"></i>
                                        <p className='m-0 pt-2  p_main'>Trust of Tanishq</p>
                                        <p style={{ fontSize: "11px" }}>Titan Privileges</p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2'>
                                        <i className="ri-verified-badge-line fs-1 text-success"></i>
                                        {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (2).png' className='img-fluid mx-auto d-block'></img> */}
                                        <p className='m-0 pt-2 p_main'>100% Certified</p>
                                        <p style={{ fontSize: "11px" }}>by CaratLane</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* =========Medium device========= */}
                    <div className='row d-lg-none d-block'>
                        <div className='col-md-12 col-sm-12 col-12 mx-auto d-block'>
                            <h3 className='font_h'>{product.title}</h3>
                            <h4 className='font_h'>{formatCurrency(selectedKT === "14KT" ? product.total14KT : product.total18KT)}</h4>
                            <p className='m-0 p-0 title_taxes pt-2'>Price inclusive of taxes. See the full <span>price breakup</span></p>
                            <p className='title_offer'><i className="ri-discount-percent-line"></i>&nbsp;Special offer for you</p>

                            <p className="KT_button">
                                <span className="align-middle">
                                    color
                                </span>
                                <span className="ps-3 align-middle" style={{ fontSize: "20px" }}>
                                    {colors.map((color) => (
                                        <i
                                            key={color.id}
                                            className="ri-circle-fill"
                                            style={{
                                                color: color.color,
                                                fontSize: "20px",
                                                position: "relative",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleColorClick(color.id)}
                                        >
                                            {selectedColor === color.id && (
                                                <i
                                                    className="ri-check-line"
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform: "translate(-50%, -50%)",
                                                        color: "#fff",
                                                        fontSize: "12px",
                                                    }}
                                                ></i>
                                            )}
                                        </i>
                                    ))}
                                </span>
                            </p>

                            {/* KT Selection Buttons */}
                            <div className="my-3 KT_button">
                                <span className="align-middle pe-3">
                                    Purity
                                </span>
                                <button
                                    className={`btn ${selectedKT === "14KT" ? "bg-dark text-light" : "btn-light text-dark"
                                        } me-2`}
                                    onClick={() => handleKTClick("14KT")}
                                >
                                    14KT
                                </button>
                                <button
                                    className={`btn ${selectedKT === "18KT" ? "bg-dark text-light" : "btn-light text-dark"
                                        } me-2`}
                                    onClick={() => handleKTClick("18KT")}
                                >
                                    18KT
                                </button>
                            </div>
                            <div className="my-3 KT_button d-flex align-items-center">
                                <span className="pe-3">
                                    Ring Size
                                </span>
                                <select className="form-select d-inline w-auto">
                                    {[...Array(21)].map((_, i) => (
                                        <option key={i} value={i + 6}>
                                            {i + 6}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* <div className=" align-items-center customize_sec container-fluid">
                                <div className="row">
                                    <div className="col-12 border my-1 bg-white">
                                        <small className="text-muted">Size</small>
                                        <p className="fw-bold mb-0">
                                            {selectedSize ? `${selectedSize} inches` : "Select Size"}
                                        </p>
                                    </div>
                                    <div className="col-12 border my-1 px-2 py-1 bg-white">
                                        <small className="text-muted">Metal</small>
                                        <p className="fw-bold mb-0">{confirmedMetal}</p>
                                    </div>
                                    <div className="col-12 border my-1 px-2 py-1 bg-white">
                                        <small className="text-muted">Diamond</small>
                                        <p className="fw-bold mb-0">{confirmedDiamondQuality}</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="btn w-100 align-middle  bg-warning"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#mdoffcanvassize"
                                aria-controls="offcanvassize"
                            >
                                CUSTOMISE
                            </button> */}
                            <button className='btn add_btn add_btn_md me-2 px-5 mt-3' onClick={addToCart}>
                                {/* <i className="ri-shopping-bag-4-line pe-2 fs-5"></i> */}
                                ADD TO CART
                            </button>
                            <button className='btn add_btn add_btn_md px-5 my-3' onClick={buyNow}>
                                {/* <i className="ri-shopping-cart-2-line pe-2 fs-5"></i> */}
                                BUY NOW
                            </button>
                            {/* <p className='delivery_cancellation pt-4'>
                                    <i className="ri-truck-line fs-5 pe-2"></i>
                                    <u> DELIVERY & CANCELLATION ESTIMATED DELIVERY BY 3RD SEP 2024</u>
                                </p> */}
                            {/* <p className='pincode_productdetail pt-2 p-0 m-0'>Your Pincode</p>
                                <div className="input-group mb-3 w-100 pincode_input">
                                    <input type="text" className="form-control" aria-describedby="basic-addon2" />
                                    <i className="ri-map-pin-line input-group-text" id="basic-addon2"></i>
                                </div> */}
                            {/* <p className='m-0'>
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
                                </p> */}
                            <div className='ps-3'>
                                <div className='row w-100 border rounded-3'>
                                    <div className='col-lg-4 col-md-4 col-sm-4 col-4 m-0 p-0'>
                                        <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/03-MAR/Others/CLlive/TOPBanner.png' className='img-fluid w-100 h-100'></img>
                                    </div>
                                    <div className='col-lg-8 col-md-8 col-sm-8 col-8 video_call'>
                                        <h6>Live Video Call</h6>
                                        <p>Join a live video call with our consultants to see your favourite designs up close!</p>
                                        <button
                                            className='btn'
                                            onClick={() => {
                                                const message = encodeURIComponent(
                                                    "Hello, I would like to schedule a video call to see the designs."
                                                );
                                                const phoneNumber = ""; // Replace with your WhatsApp number including country code
                                                const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
                                                window.open(whatsappURL, "_blank"); // Opens WhatsApp in a new tab
                                            }}
                                        >
                                            Schedule a Video Call
                                        </button>
                                    </div>

                                </div>
                            </div>
                            {/* <div className='mt-3 ps-3'>
                                    <div className='row w-100 border rounded-3 store py-2 my-2'>
                                        <div className='col-md-1 col-sm-1 col-2 m-0 p-0'>
                                            <i className="ri-store-2-line fs-1 ps-2"></i>
                                            <img alt='' src='assets/img/store.png' className='img-fluid'></img>
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
                                </div> */}
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
                            {/* <div className='rounded-3 policy_sec pt-3 px-3 pb-2 pt-4 mt-3'>
                                    <h6>Earn 894 xCLusive points with this order</h6>
                                    <p>(1 xClusive point = ₹1)</p>
                                </div> */}
                            <div className='mt-2'>
                                <p className='text-center' style={{ fontSize: "13px" }}>Learn more on about our <span className='fw-bold' style={{ color: "#de57e5" }}>TERMS & POLICIES</span></p>
                            </div>
                            <div className='mt-2'>
                                <div className='row text-center'>
                                    <div className='col-lg-4 col-md-4 col-sm-4 col-4  mt-2'>
                                        {/* <img alt='' src='assets/img/delivery.png' className='img-fluid mx-auto d-block'></img> */}
                                        <i className="ri-discount-percent-line fs-1"></i>
                                        <p className='p_main m-0 pt-2'>100% BIS</p>
                                        <p style={{ fontSize: "11px" }}>Hallmarked Jewellery</p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-4 col-4 mt-2'>
                                        {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (3).png' className='img-fluid mx-auto d-block'></img> */}
                                        <i className="ri-bubble-chart-line fs-1"></i>
                                        <p className='m-0 pt-2  p_main'>Trust of Tanishq</p>
                                        <p style={{ fontSize: "11px" }}>Titan Privileges</p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-4 col-4 mt-2'>
                                        <i className="ri-verified-badge-line fs-1 text-success"></i>
                                        {/* <img alt='' src='assets/img/pdp-delivery-tah-sprite (2).png' className='img-fluid mx-auto d-block'></img> */}
                                        <p className='m-0 pt-2 p_main'>100% Certified</p>
                                        <p style={{ fontSize: "11px" }}>by CaratLane</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='container-fluid py-3'>
                <div>
                    <div className='row'>
                        <div className='col-xl-8'>
                            {/* <h5>PRODUCT DETAILS</h5> */}
                            <div className="section product-details">
                                <h3>Product Details</h3>
                                <div className="grid">
                                    <div className="detail-box">
                                        <h4>Weight</h4>
                                        <p className='m-0 p-0 mb-2'>Gross (Product): {product.grossWt} gram</p>
                                        <p>Net (Gold): {selectedKT === "14KT" ? product.netWeight14KT : product.netWeight18KT} gram</p>
                                    </div>
                                    <div className="detail-box">
                                        <h4>Purity</h4>
                                        <p>{selectedKT} Yellow Gold</p>
                                    </div>
                                </div>
                            </div>
                            <div className="diamonds-gemstones">
                                <h3>Diamond & Gemstones</h3>
                                <p>Weight: 1.880 Ct</p>
                                <div className="table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Size</th>
                                                <th>Color</th>
                                                <th>Clarity</th>
                                                <th>Shape</th>
                                                <th>No. of Diamonds</th>
                                                <th>Total Weight</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>0.01 to 0.07</td>
                                                <td>GH</td>
                                                <td>VS</td>
                                                <td>Round</td>
                                                <td>38</td>
                                                <td>0.380</td>
                                            </tr>
                                            <tr>
                                                <td>1.50 to 1.99</td>
                                                <td>G</td>
                                                <td>VS1</td>
                                                <td>Emerald</td>
                                                <td>1</td>
                                                <td>1.500</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="section price-breakup pt-3">
                                <h3>Price Breakup</h3>
                                <ul className='ps-0'>
                                    <p className='m-0 p-0'>
                                        <span className='price_break'>Gold:</span>
                                        <span className='price_break_price text_end_break'>{formatCurrency(selectedKT === "14KT" ? product.price14KT : product.price18KT)}/-</span>
                                    </p>
                                    <p className='m-0 p-0'>
                                        <span className='price_break'>Diamond:</span>
                                        <span className='price_break_price text_end_break'>{formatCurrency(product.diamondprice)}/-</span>
                                    </p>
                                    <p className='m-0 p-0'>
                                        <span className='price_break'>Making Charge:</span>
                                        <span className='price_break_price text_end_break'>{formatCurrency(selectedKT === "14KT" ? product.makingCharge14KT : product.makingCharge18KT)}/-</span>
                                    </p>
                                    <p className='m-0 p-0'>
                                        <span className='price_break'>GST:</span>
                                        <span className='price_break_price text_end_break'>{formatCurrency(selectedKT === "14KT" ? product.gst14KT : product.gst18KT)}/-</span>
                                    </p>
                                    <p className='m-0 p-0'>
                                        <span className='price_break'>Total:</span>
                                        <span className='price_break_price text_end_break'>{formatCurrency(selectedKT === "14KT" ? product.total14KT : product.total18KT)}/-</span>
                                    </p>
                                </ul>
                            </div>

                        </div>
                        <div className='col-xl-4'>

                        </div>
                    </div>
                </div>
            </section>

            {/* <h1>{product.title}</h1>
            <img src={product.img} alt={product.title} />
            <p>{product.description}</p>
            <p>Price: {product.price}</p> */}
            <section className='container my-3'>
                <h3 className='text-center pb-4 font_main'>You may also Like</h3>
                {/* <div className='row mb-4'>
                    {
                        allProduct.map((item) => {
                            return <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 card_shadow' key={item.id}>
                                <ProductCard Productsitem={item} />
                            </div>
                        })
                    }
                </div> */}

                <h3 className='text-center py-4 font_main'>Recently Viewed</h3>
                <div className="row position-relative mb-4">
                    {recentlyViewed.length > 0 ? (
                        <>
                            {/* Prev Button */}
                            {currentIndex > 0 && (
                                <div>
                                    <button
                                        onClick={() => search?.current?.slickPrev()}
                                        className="pre-btn-set"
                                    >
                                        <i className="ri-arrow-left-wide-line"></i>
                                    </button>
                                </div>
                            )}

                            <Slider ref={search} {...slider_search}>
                                {recentlyViewed.map((item) => (
                                    <div
                                        className="card border-0 w-100 mx-auto d-block"
                                        key={item.product_id}
                                    >
                                        <Link to={`/Productdetails/${item.product_id}`}>

                                            <img
                                                alt={item.title}
                                                src={item.image01}
                                                className="img-fluid px-2 position-relative"
                                            />
                                        </Link>
                                        <div className="card-body cartlane">
                                            <h6>
                                                {formatCurrency(item.price)}{" "}
                                                <span>
                                                    <del>{formatCurrency(item.delprice)}</del>
                                                </span>
                                            </h6>
                                            <p>{item.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>

                            {/* Next Button */}
                            {currentIndex < recentlyViewed.length - slider_search.slidesToShow && (
                                <div>
                                    <button
                                        onClick={() => search?.current?.slickNext()}
                                        className="next-btn-set float-end"
                                    >
                                        <i className="ri-arrow-right-wide-line"></i>
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center w-100 pt-5">
                            <p>You haven't viewed any products yet. Start exploring now!</p>
                        </div>
                    )}
                </div>
            </section>
            {/* Large Offcanvas */}
            <div className="offcanvas offcanvas-end offcanvas_end_size" tabIndex="-1" id="offcanvassize" aria-labelledby="offcanvassizeLabel">
                <div className="offcanvas-header offcanvas_size_header d-flex justify-content-between align-items-center">
                    <div className="text-start pt-5">
                        <p className='m-0 p-0'>Estimated price</p>
                        <span className="fw-bold" style={{ fontSize: "18px" }}>{formatCurrency(adjustedPrice)}&nbsp;</span>
                        {/* <span className="text-decoration-line-through text-muted">{formatCurrency(delprice)}</span> */}
                    </div>
                    <div className="text-end">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        {/* <div className='pt-3 delivery_size'>
                            <p className='m-0 p-0'>Delivery By</p>
                            <span className="fw-bold">14th Oct</span>
                        </div> */}
                    </div>
                </div>

                <div className="offcanvas-body offcanvas_body_size">
                    {/* Choice of Metal */}
                    <div className="mb-2 metal_offcanvas">
                        <h6 className="font_h mb-3">Choice of Metal</h6>
                        <div className="row g-3">
                            {/* Metal Options */}
                            {metalOptions.map((item, index) => (
                                <div key={index} className="col-3">
                                    <button
                                        className={`btn size-btn w-100 p-3 ${selectedMetal === item.metal ? 'selected' : ''}`}
                                        onClick={() => handleMetalClick(item.metal)}
                                    >
                                        <p>{item.metal}</p>
                                        <small className="text-muted d-block">in Stock!</small>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Diamond Quality */}
                    <div className="mb-2">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="font_h">Diamond Quality</h6>
                            <Link to="">Diamond Guide</Link>
                        </div>
                        <div className="row g-3 diamond_offcanvas">
                            {diamondOptions.map((item, index) => (
                                <div key={index} className="col-3">
                                    <button
                                        className={`btn size-btn w-100 p-3 ${selectedDiamondQuality === item.quality ? 'selected' : ''}`}
                                        onClick={() => handleDiamondQualityClick(item.quality)}
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
                            <h6 className="font_h">Select Size</h6>
                            <Link to="">Size Guide</Link>
                        </div>
                        <div className="row g-3 size_offcanvas">
                            {/* Size buttons */}
                            {sizeOptions.map((item) => (
                                <div key={item.size} className="col-3">
                                    <button
                                        className={`btn size-btn w-100 p-2 ${selectedSize === item.size ? 'selected' : ''}`}
                                        onClick={() => handleSizeClick(item.size)}
                                    >
                                        <p className="fw-bold m-0 p-0">{item.size} inches</p>
                                        <p className="text-muted m-0 p-0" style={{ fontSize: "10px" }}>{item.mm}</p>
                                        <small>{item.stock}</small>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="offcanvas-footer text-center offcanvas_size_btn" data-bs-dismiss="offcanvas" aria-label="Close">
                    <button className="btn w-100 py-3 fw-bold text-uppercase" onClick={handleConfirm}>Confirm Customisation</button>
                </div>
            </div>
            {/* Md Offcanvas */}
            <div className="offcanvas offcanvas-bottom offcanvas_bottom_size" tabIndex="-1" id="mdoffcanvassize" aria-labelledby="mdoffcanvassizeLabel">
                <div className="offcanvas-header offcanvas_size_header d-flex justify-content-between align-items-center">
                    <div className="text-start pt-5">
                        <p className='m-0 p-0'>Estimated price</p>
                        <span className="fw-bold" style={{ fontSize: "18px" }}>{formatCurrency(adjustedPrice)}&nbsp;</span>
                        {/* <span className="text-decoration-line-through text-muted">{formatCurrency(delprice)}</span> */}
                    </div>
                    <div className="text-end">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        {/* <div className='pt-3 delivery_size'>
                                <p className='m-0 p-0'>Delivery By</p>
                                <span className="fw-bold">14th Oct</span>
                            </div> */}

                    </div>
                </div>

                <div className="offcanvas-body offcanvas_body_size">
                    {/* Choice of Metal */}
                    <div className="mb-2 metal_offcanvas">
                        <h6 className="font_h mb-3">Choice of Metal</h6>
                        <div className="row g-3">
                            {/* Metal Options */}
                            {metalOptions.map((item, index) => (
                                <div key={index} className="col-3">
                                    <button
                                        className={`btn size-btn w-100 p-3 ${selectedMetal === item.metal ? 'selected' : ''}`}
                                        onClick={() => handleMetalClick(item.metal)}
                                    >
                                        <p>{item.metal}</p>
                                        <small className="text-muted d-block">in Stock!</small>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Diamond Quality */}
                    <div className="mb-2">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="font_h">Diamond Quality</h6>
                            <Link to="">Diamond Guide</Link>
                        </div>
                        <div className="row g-3 diamond_offcanvas">
                            {diamondOptions.map((item, index) => (
                                <div key={index} className="col-3">
                                    <button
                                        className={`btn size-btn w-100 p-3 ${selectedDiamondQuality === item.quality ? 'selected' : ''}`}
                                        onClick={() => handleDiamondQualityClick(item.quality)}
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
                            <h6 className="font_h">Select Size</h6>
                            <Link to="">Size Guide</Link>
                        </div>
                        <div className="row g-3 size_offcanvas">
                            {/* Size buttons */}
                            {sizeOptions.map((item) => (
                                <div key={item.size} className="col-3">
                                    <button
                                        className={`btn size-btn w-100 p-2 ${selectedSize === item.size ? 'selected' : ''}`}
                                        onClick={() => handleSizeClick(item.size)}
                                    >
                                        <p className="fw-bold m-0 p-0">{item.size} inches</p>
                                        <p className="text-muted m-0 p-0" style={{ fontSize: "10px" }}>{item.mm}</p>
                                        <small>{item.stock}</small>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="offcanvas-footer text-center offcanvas_size_btn" data-bs-dismiss="offcanvas" aria-label="Close">
                    <button className="btn w-100 py-3 fw-bold text-uppercase" onClick={handleConfirm}>Confirm Customisation</button>
                </div>
            </div>
        </div>
    );
};

export default Productdetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // Import useParams to get the product ID
// import axios from "axios"; // Ensure axios is imported

// const ProductDetails = () => {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams(); // Get the product ID from the URL

//   // Fetch the product details by ID
//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`https://saltandglitzapi-rkm5g.kinsta.app/v1/upload/get_id/${id}`);
//         setProduct(response.data); // Set product details in state
//       } catch (err) {
//         console.error("Error fetching product details:", err.response || err);
//         setError("Failed to load product details.");
//       } finally {
//         setLoading(false); // Stop loader
//       }
//     };

//     fetchProductDetails();
//   }, [id]); // Trigger fetch when product ID changes

//   // Loader
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Error message
//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Render product details
//   return (
//     <div>
//       <h1>Product Details</h1>
//       {product && (
//         <div className="product-details">
//           <img src={product.img} alt={product.title} className="product-image" />
//           <h2>{product.title}</h2>
//           <p>Category: {product.category}</p>
//           <p>Price: ₹{product.price}</p>
//           <p>{product.description}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;

