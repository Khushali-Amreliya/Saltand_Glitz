import React, { useState, useEffect } from 'react';
import EmptyState from '../EmptyState';
import { formatCurrency } from '../../Utils/formateCurrency';
import Aos from 'aos';
import "aos/dist/aos.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import Helmet from '../../Components/Helmet';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../Store/Slice/CartSlice';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch wishlist items from the backend
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`https://saltandglitz-api.vercel.app/v1/wishlist/get_wishlist/${user._id}`);
      // console.log("Fetched Wishlist Response:", response.data);
      if (response.status === 200) {
        setWishlistItems(response.data.wishlist.products);
      }
    } catch (error) {
      // console.error('Error fetching wishlist items:', error.response?.data || error.message);
      // toast.error("Failed to load wishlist", {
      //   position: "top-center",
      //   autoClose: 1000,
      // });
    } finally {
      setLoading(false);
    }
  };

  // Remove item from wishlist
  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(`https://saltandglitz-api.vercel.app/v1/wishlist/remove_wishlist/${user._id}/${id}`);
      // console.log("Remove Wishlist Response:", res);
      if (res.status === 200) {
        setWishlistItems((prev) =>
          prev.filter((item) => item.productId.product_id !== id)
        );
        toast.success("Item removed from wishlist", {
          position: "top-center",
          autoClose: 1000,
        });
      } else {
        throw new Error("Failed to remove item from wishlist");
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error.response?.data || error.message);
      toast.error("Error removing item from wishlist", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  // Move item from wishlist to cart
  const handleMoveToCart = async (item, id) => {
    setLoading(true)
    const cartItem = {
      product: item.productId.product_id,
      user: user._id,
    };

    try {
      // Add item to cart
      const addCartResponse = await axios.post(
        'https://saltandglitz-api.vercel.app/v1/cart/addCart',
        cartItem
      );
      console.log("Cart API Response:", addCartResponse);

      if (addCartResponse.status === 201 || addCartResponse.status === 200) {
        // Remove item from wishlist
        const removeWishlistResponse = await axios.delete(
          `https://saltandglitz-api.vercel.app/v1/wishlist/remove_wishlist/${user._id}/${id}`
        );
        console.log("Remove Wishlist Response:", removeWishlistResponse);

        if (removeWishlistResponse.status === 200) {
          // Update state and Redux store
          setWishlistItems((prev) =>
            prev.filter((wishlistItem) => wishlistItem.productId.product_id !== id)
          );
          const updatedCart = addCartResponse.data.updatedCart || addCartResponse.data.newCart;
          dispatch(cartAction.addItem(updatedCart));

          toast.success("Item moved to cart successfully!", {
            position: "top-center",
            autoClose: 1000,
          });
          navigate('/cart');
        } else {
          throw new Error("Failed to remove item from wishlist");
        }
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error Details:", error.response?.data || error.message);
      toast.error("Error processing your request", {
        position: "top-center",
        autoClose: 1000,
      });
    } finally{
      setLoading(false)
    }
  };


  useEffect(() => {
    Aos.init();
    fetchWishlist();
  }, []);

  return (
    <Helmet title="Wishlist">
      {loading && <Loader />}
      <section className='container py-5'>
        {
          wishlistItems.length > 0 ? (
            <section className='wishlist-items'>
              <div className='row'>
                {
                  wishlistItems.map((item) => (
                    <div key={item.productId.product_id} className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6' data-aos="zoom-in-up" data-aos-duration="2000">
                      <div className='card border-0'>
                        <Link to={`/Productdetails/${item.productId.product_id}`}>
                          <img alt={item.productId.title} src={item.productId.image01} className='position-relative img-fluid'></img>
                        </Link>
                        <div className='card-body d-flex justify-content-between align-items-center'>
                          <div>
                            <p className='m-0'>{formatCurrency(item.productId.total14KT)}</p>
                            <h6 className='d-inline-block'>{item.productId.title}</h6>
                          </div>
                          <i
                            className='ri-shopping-cart-2-fill align-middle wishlist_cart'
                            onClick={() => {
                              if (item && item.productId && item.productId.product_id) {
                                handleMoveToCart(item, item.productId.product_id);
                              } else {
                                console.error('Invalid productId');
                              }
                            }}
                          >
                          </i>
                          <i
                            className="ri-close-line wishlist_close_icon"
                            onClick={() => handleRemove(item.productId.product_id)}
                          ></i>
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
      </section>
    </Helmet>
  );
};

export default Wishlist;
