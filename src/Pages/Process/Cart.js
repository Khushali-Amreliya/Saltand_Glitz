import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../Store/Slice/CartSlice";
import EmptyState from "../EmptyState";
import { formatCurrency } from "../../Utils/formateCurrency";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { toast } from "react-toastify";
import Helmet from "../../Components/Helmet";
// import { data } from "jquery";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItem);
  // const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const discountPercentage = useSelector((state) => state.cart.discount); // Renamed for clarity
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  // const [subtotal, setSubtotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0); // New state for coupon discount in rupees
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState("");
  const [totallPrice, setTotallPrice] = useState(0);
  const [product, setProduct] = useState([]); // Initialize as an array
  const [tQuantity, setTQuantity] = useState([])
  const user = JSON.parse(localStorage.getItem('user'));


  const openModal = (item) => {
    setSelectedProduct(item);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code); // Track the copied code
    setTimeout(() => setCopiedCode(""), 1000); // Hide the popover after 2 seconds
  };

  const calculateSubtotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.totalprice),
      0
    );
  }, [cartItems]);

  const updateAmounts = useCallback(() => {
    const newSubtotal = calculateSubtotal();
    // setSubtotal(newSubtotal);

    // Calculate discount amount in rupees
    const calculatedDiscount = newSubtotal * (discountPercentage / 100);
    setCouponDiscount(calculatedDiscount);

    // Calculate total amount after discount
    const discountedAmount = newSubtotal - calculatedDiscount;
    setTotalAmount(discountedAmount);
  }, [calculateSubtotal, discountPercentage]);

  useEffect(() => {
    updateAmounts();
  }, [cartItems, discountPercentage, updateAmounts]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true); // Start loader
        const response = await axios.get(`https://saltandglitz-api.vercel.app/v1/cart/getCart/${user._id}`);
        console.log("Cart", response.data); // Debug response structure

        const data = response.data;

        // Calculate Main Price (Multiplying total14KT with quantity)
        const productsWithPrices = data.cart.quantity.map((item) => {
          const itemPrice = (item.productId.total14KT || 0) * (item.quantity || 0); // Multiply total14KT price with quantity
          return {
            ...item, // Spread other product properties
            itemPrice, // Add calculated price for the product
          };
        });

        // Calculate the total main price
        const mainPrice = productsWithPrices.reduce((acc, item) => acc + item.itemPrice, 0);

        // console.log("Products with Item Prices:", productsWithPrices);
        // console.log("Calculated Main Price:", mainPrice);

        // Set state
        setProduct(productsWithPrices); // Updated products with itemPrice
        setTotallPrice(mainPrice); // Total price

        const quantity = response.data;
        setTQuantity(quantity) // Total quantity
      } catch (err) {
        console.error("Error fetching cart data:", err);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchCart();
  }, [user._id]);

  const removeToCart = async (item) => {
    setLoading(true);
    const cartItem = {
      user: user._id,
      productId: item.productId.product_id,
    };

    try {
      const response = await axios.delete(
        `https://saltandglitz-api.vercel.app/v1/cart/remove/${user._id}/${item.productId.product_id}`,
        cartItem
      );
      console.log(response);

      if (response.status === 200) {
        dispatch(cartAction.removeItem(response.data));
        toast.success('Item removed from the cart', {
          position: 'top-center',
          autoClose: 1000,
        });
        navigate("/");
      } else {
        toast.error("Failed to remove item from cart!");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("An error occurred while removing item from cart.");
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = async (productId) => {
    setLoading(true);
    const response = await axios.get(`https://saltandglitz-api.vercel.app/v1/cart/getCart/${user._id}`);
    // console.log(response);

    const data = response.data;

    // Prepare the payload for increment
    const cartItem = {
      cartId: data?.cart?.cart_id, // Pass the cart ID
      productId, // Pass the product ID
      quantity: 1, // Increment by 1 (default)
    };
    // console.log(cartItem);
    console.log("Increment Payload:", cartItem);

    try {
      const response = await axios.post(
        "https://saltandglitz-api.vercel.app/v1/cart/cartIncrement",
        cartItem
      );

      if (response.status === 200) {
        toast.success("Product quantity incremented successfully!", {
          position: "top-center",
          autoClose: 2000,
        });

        // Fetch the updated cart from response
        const updatedCart = response.data.updatedCart;

        // Dispatch updated cart to Redux store
        dispatch(cartAction.updateCart(updatedCart));
      } else {
        toast.error("Failed to increment product quantity!");
      }
    } catch (error) {
      // console.error("Error incrementing product quantity:", error.message);
      // toast.error("An error occurred while incrementing quantity!");
    } finally {
      setLoading(false);
    }
  };

  const handleDecrement = async (productId) => {
    setLoading(true);
    const response = await axios.get(`https://saltandglitz-api.vercel.app/v1/cart/getCart/${user._id}`);
    // console.log(response);

    const data = response.data;
    // Prepare the payload for increment
    const cartItem = {
      cartId: data?.cart?.cart_id, // Pass the cart ID
      productId, // Pass the product ID
      quantity: 1, // Increment by 1 (default)
    };

    console.log("Increment Payload:", cartItem);

    try {
      const response = await axios.post(
        "https://saltandglitz-api.vercel.app/v1/cart/cartDecrement",
        cartItem
      );

      if (response.status === 200) {
        toast.success("Product quantity decremented successfully!", {
          position: "top-center",
          autoClose: 2000,
        });

        // Fetch the updated cart from response
        const updatedCart = response.data.updatedCart;

        // Dispatch updated cart to Redux store
        dispatch(cartAction.updateCart(updatedCart));
      } else {
        toast.error("Failed to decrement product quantity!");
      }
    } catch (error) {
      // console.error("Error incrementing product quantity:", error.message);
      // toast.error("An error occurred while incrementing quantity!");
    } finally {
      setLoading(false);
    }
  };

  const moveToWishlist = async (item) => {
    setLoading(true);

    // Prepare the cart item to be removed
    const cartItem = {
      user: user._id,
      productId: item.productId.product_id, // Use the correct productId
    };
    // console.log(cartItem);

    try {
      // First, remove the item from the cart
      const removeResponse = await axios.delete(
        `https://saltandglitz-api.vercel.app/v1/cart/remove/${user._id}/${item.productId.product_id}`,  // Correct endpoint for removing from cart
        { data: cartItem }  // Send cartItem correctly in the DELETE request
      );

      if (removeResponse.status === 200) {
        // Item removed successfully from cart, now add it to the wishlist
        const wishlistResponse = await axios.post(
          'https://saltandglitz-api.vercel.app/v1/wishlist/create_wishlist',
          {
            userId: user._id,  // Send userId here
            productId: item.productId.product_id,  // Send the correct productId
          }
        );

        if (wishlistResponse.status === 200 || wishlistResponse.status === 201) {
          // Add to the wishlist successfully, update the state
          dispatch(cartAction.removeItem(removeResponse.data));  // Remove from cart in the store
          dispatch(cartAction.addToWishlist(wishlistResponse.data));  // Add to wishlist in the store

          toast.success('Item moved to wishlist', {
            position: 'top-center',
            autoClose: 1000,
          });
          navigate('/wishlist');
        } else {
          toast.error('Failed to add item to wishlist. Response status: ' + wishlistResponse.status);
        }
      } else {
        toast.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error moving item to wishlist:', error);
      toast.error('An error occurred while moving item to wishlist');
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init();
  }, []);

  const handlePlaceOrder = () => {
    setLoading(true);

    // Simulating a login check; replace with your actual login check
    const isLoggedIn = localStorage.getItem("user");

    setTimeout(() => {
      setLoading(false);
      if (isLoggedIn) {
        navigate("/shipping"); // Redirect to shipping page if logged in
      } else {
        navigate("/login"); // Redirect to login page if not logged in
      }
    }, 1000);
  };

  const handleApplyCoupon = () => {
    dispatch(cartAction.applyCoupon(couponCode));
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll])
  return (
    <Helmet title="Cart">
      <>
        {loading && <Loader />}
        <section className={`cart_header ${isScrolled ? "scrolled" : ""}`}>
          <div className="cart_header_left">
            <Link to="/" className="back-button">
              <i className="ri-arrow-left-line"></i>
            </Link>
            <div className="cart_logo">
              <i className="ri-shopping-cart-fill cart_logo_icon d-lg-block d-md-block d-sm-block d-none"></i>
            </div>
          </div>

          <div className="cart_header_center">
            <div className="toggle-buttons">
              <button className="toggle-button ">
                Shopping Cart ({tQuantity.totalQuantity})
              </button>
              <button className="toggle-button active d-lg-block d-none">
                Trial Cart (0)
              </button>
            </div>
          </div>

          <div className="cart_header_right">
            <Link to="" className="assistance-link">
              <span className="d-lg-block d-md-block d-sm-block d-none">
                Need Assistance?
              </span>
              <i className="ri-whatsapp-line whatsapp-icon"></i>
            </Link>
          </div>
        </section>
        <section className="container cart_Sec">
          <div className="row">
            {product.length > 0 ? (
              <>
                <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 mb-4 mt-3 mt-sm-5">
                  <div>
                    <div className="cart_headline">
                      <div className="headline_title pt-3 ps-3">
                        <strong>Get ₹1078 xCLusive points on this Order</strong>
                        &nbsp;Redeem these points on your next order&nbsp;
                        <Link
                          to="/"
                          className="text-decoration-none"
                          style={{ color: "#3f91a1" }}
                        >
                          Know More
                        </Link>
                      </div>
                    </div>
                    {product.map((item) => {
                      return (
                        <div
                          className="row cart_product align-items-center d-flex my-1"
                          key={item.productId.product_id} // Use product_id as key
                        >
                          <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                            <Link to={`/Productdetails/${item.productId.product_id}`}>
                              <img
                                alt={item.productId.title}
                                src={item.productId.image01}
                                className="img-fluid cart_img"
                              />
                            </Link>
                          </div>
                          <div className="col-lg-9 col-md-8 col-sm-8 col-8 d-flex justify-content-between">
                            <div>
                              <h6 className="cart_Title m-0 p-0">{item.productId.title}</h6>
                              <p className="m-0 p-0">
                                <span className="cart_price">
                                  {formatCurrency(item.itemPrice)} {/* Updated item price */}
                                </span>
                              </p>
                              <p
                                className="cart_quantity m-0 pt-1"
                                style={{ cursor: "pointer", letterSpacing:"0.5px", fontSize:"11px" }}
                              >
                                Quantity: &nbsp;
                                <span className="increse_decrese">
                                  <span
                                    className="px-2"
                                    onClick={() => handleIncrement(item.productId.product_id)}
                                  >
                                    <i className="ri-add-line"></i>
                                  </span>
                                  &nbsp;
                                  <span style={{ fontSize: "14.5px" }}>
                                    {item.quantity}
                                  </span>
                                  &nbsp;
                                  <span className="px-2" onClick={() => handleDecrement(item.productId.product_id)}>
                                    <i className="ri-subtract-line"></i>
                                  </span>
                                </span>
                              </p>
                              {/* <p className="cart_delivery">
                                Delivery by - 30th Aug
                              </p> */}
                            </div>
                            {/* Delete Button Floating to the End */}
                            <button
                              type="button"
                              className="border-0 btn"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              onClick={() => openModal(item)} // Set the selected item when the remove button is clicked
                            >
                              <span className="delete__btn float-end">
                                <i className="ri-close-circle-fill"></i>
                              </span>
                            </button>

                            {/* Modal for remove cart */}
                            <div
                              className="modal fade"
                              id="staticBackdrop"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              tabIndex="-1"
                              aria-labelledby="staticBackdropLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header border-0">
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body text-center modal_content">
                                    {selectedProduct && (
                                      <>
                                        <img
                                          alt={selectedProduct.productId.title}
                                          src={selectedProduct.productId.image01}
                                          className="w-25 mx-auto d-block"
                                        />
                                        <h6 className="m-0 pt-3">Move Design from Cart</h6>
                                        <p>
                                          Are you sure you want to move this design from the cart?
                                        </p>
                                      </>
                                    )}
                                  </div>
                                  <div className="modal-footer border-0 mx-auto d-block">
                                    <button
                                      type="button"
                                      className="btn modal_remove"
                                      data-bs-dismiss="modal"
                                      onClick={() => removeToCart(selectedProduct, selectedProduct.productId.product_id)}
                                    >
                                      REMOVE
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-primary modal_wishlist"
                                      data-bs-dismiss="modal"
                                      onClick={() => moveToWishlist(selectedProduct, selectedProduct.productId.product_id)}
                                    >
                                      MOVE TO WISHLIST
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 cart_border mt-0 mt-sm-5">
                  <div>
                    {/* coupon code */}
                    <div className="cart_Coupon">
                      <h6>
                        <i className="ri-discount-percent-line pe-2 fs-4"></i>
                        <span style={{ fontSize: "13px" }}>Apply Coupon</span>
                        <span className="arrow">
                          <i
                            className="ri-arrow-right-line  fs-5 text-center mx-auto d-block"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          ></i>
                        </span>
                      </h6>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="col-lg-12 modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header border-0">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Apply Coupon
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body border-0">
                            <div className="input-group mb-3 coupon_input">
                              <input
                                type="text"
                                className="form-control border-0"
                                placeholder="Enter Coupon Code"
                                aria-describedby="basic-addon2"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                              />
                              <span
                                className="input-group-text border-0"
                                id="basic-addon2"
                                style={{ cursor: "pointer" }}
                                onClick={handleApplyCoupon}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                APPLY
                              </span>
                            </div>
                            <div className="coupon_modal">
                              <h6 className="text-center py-2 fw-bold">
                                Other Offers at CartLane
                              </h6>

                              {[
                                {
                                  code: "SHAYAUPSELL10",
                                  discount: "10% OFF",
                                  validity: "August 21 2024",
                                  description:
                                    "Get Extra 10% OFF on purchase of 3 or more items",
                                },
                                {
                                  code: "PERFECT3",
                                  discount: "3% OFF",
                                  validity: "August 19 2024",
                                  description:
                                    "Flat 3% Off on Loose Solitaires Only",
                                },
                                {
                                  code: "MOUNT5",
                                  discount: "5% OFF",
                                  validity: "August 19 2024",
                                  description:
                                    "Flat 5% Off on Solitaire Mount SKU",
                                },
                              ].map((offer, index) => (
                                <div className="coupan_box mx-3" key={index}>
                                  <div className="offer-label border border-start-0 border-top-0 border-bottom-0 px-3 align-items-center d-flex">
                                    <h5 className="pt-3 fw-bold text-light">
                                      {offer.discount}
                                    </h5>
                                  </div>
                                  <div className="coupon_box1 align-items-center d-flex position-relative">
                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                      <div>
                                        <h6 className="m-0">
                                          {offer.code}
                                          <span
                                            onClick={() =>
                                              handleCopyCode(offer.code)
                                            }
                                            className="text-danger ms-2"
                                            style={{ cursor: "pointer" }}
                                          >
                                            Copy Code
                                          </span>
                                        </h6>
                                        <p>{offer.validity}</p>
                                        <p className="coupon_box1_p">
                                          {offer.description}
                                        </p>
                                      </div>
                                    </div>
                                    {copiedCode === offer.code && (
                                      <div
                                        className="popover text-success text-center rounded position-absolute"
                                        style={{
                                          top: "11px",
                                          left: "185px",
                                          zIndex: "1050",
                                        }}
                                      >
                                        <i className="ri-check-double-line"></i>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* pincode code */}
                    <div className="cart_Pincode">
                      <h6>
                        <i className="ri-focus-3-line pe-2 fs-4"></i>
                        <span style={{ fontSize: "13px" }}>
                          Check Delivery & Details
                        </span>
                        <span className="arrow_pin">
                          <i
                            className="ri-arrow-right-line  fs-5 text-center mx-auto d-block"
                            data-bs-toggle="modal"
                            data-bs-target="#pincode"
                          ></i>
                        </span>
                      </h6>
                    </div>
                    <div
                      className="modal fade"
                      id="pincode"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="col-lg-12 modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header border-0">
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body border-0 text-center pincode_modal">
                            <img
                              alt=""
                              src="assets/img/location.png"
                              className="img-fluid mx-auto d-block"
                            ></img>
                            <h5 className="pt-3">
                              Enter your Pincode
                              <br /> to browse better
                            </h5>
                            <p className="pb-2">
                              Get fastest delivery dates possible, check
                              <br /> appointment for trial at home. Find nearby{" "}
                              <br />
                              stores & design availability in stores
                            </p>
                            <div className="pincode_search mb-2">
                              <label
                                htmlFor="pinCode"
                                className="pincode_label"
                              >
                                Enter Pincode
                              </label>
                              <input
                                type="text"
                                placeholder="Enter Pincode"
                                className="form-control input_location border-0 bg-transparent"
                              ></input>
                              <span className="arrow_pincode">
                                <i className="ri-arrow-right-line"></i>
                              </span>
                            </div>
                            <p className="current_pincode">
                              Use Your Current Location
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* total amount */}
                    <div className="cart_amount">
                      <div className="m-0 p-0 px-2">
                        <h6 className="m-0 p-0">
                          <span className="title_amount">Subtotal</span>
                          <span className="text_price text_end">
                            {formatCurrency(totallPrice)}
                          </span>
                        </h6>
                        <h6 className="m-0 p-0">
                          <span className="title_amount">Coupon Discount</span>
                          <span className="text_coupon  text_end">
                            - {formatCurrency(couponDiscount.toFixed())}
                          </span>
                        </h6>
                        <h6 className="m-0 p-0">
                          <span className="title_amount">
                            Shipping (Standard)
                          </span>
                          <span className="text_free text_end">Free</span>
                        </h6>
                      </div>
                      <div className="total_Amount px-2">
                        <h6 className="">
                          Total Cost
                          <span className="">
                            {formatCurrency(totallPrice.toFixed())}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <button
                      onClick={handlePlaceOrder}
                      className="btn mx-auto d-block place_order_btn w-100"
                    >
                      PLACE ORDER
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </section>
        <section className="cart_footer position_cart">
          <div className="cart_footer_left pt-3">
            <p>
              <strong>Contact Us:</strong>&nbsp; +91-44-66075200 (Helpline) |
              contact us@caratlane.com
            </p>
          </div>
          <div className="cart_footer_right">
            <img
              src="assets/img/cart_footer_logo.png"
              alt="payment-icon"
              className="payment-icon"
            />
            <img
              src="assets/img/cart_footer_logo1.png"
              alt="MasterCard"
              className="payment-icon"
            />
            <img
              src="assets/img/cart_footer_logo2.png"
              alt="PayPal"
              className="payment-icon"
            />
            <img
              src="assets/img/cart_footer_logo3.png"
              alt="American Express"
              className="payment-icon"
            />
          </div>
        </section>
      </>
    </Helmet>
  );
};

export default Cart;
