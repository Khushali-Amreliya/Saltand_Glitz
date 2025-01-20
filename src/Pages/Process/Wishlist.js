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
  const [wishlistItems, setWishlistItems] = useState([]); // Local state for wishlist items
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(true); // Loader state

  // console.log(wishlistItems);

  // Fetch wishlist items from backend
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`https://saltandglitz-api.vercel.app/v1/wishlist/get_wishlist/${user._id}`);
      if (response.status === 200) {
        setWishlistItems(response.data.wishlist.products); // Update the local state with fetched data
      }
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      // toast.error("Failed to load wishlist", {
      //   position: "top-center",
      //   autoClose: 1000,
      // });
    } finally {
      setLoading(false); // Stop loader after fetching data
    }
  };
  // console.log(wishlistItems);

  // Remove from wishlist
  const handleRemove = async (id) => {
    // console.log('User ID:', user._id);
    // console.log('Item ID:', id);

    try {
      await axios.delete(`https://saltandglitz-api.vercel.app/v1/wishlist/remove_wishlist/${user._id}/${id}`);
      // console.log('API Response:', res);

      setWishlistItems(wishlistItems.filter((item) => item.productId.product_id !== id) // Adjust key if needed
      );

      toast.success("Item removed from wishlist", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      console.error('Error removing item from wishlist:', error.response?.data || error.message);

      toast.error("Error removing item from wishlist", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  // Add to cart and remove from wishlist
  // const handleMoveToCart = async (item, id) => {
  //   const cartItem = {
  //     product_id: item.productId.product_id,
  //     userId: user._id,
  //   };
  //   // console.log(id);
  //   console.log(cartItem);

  //   try {
  //     const res = await axios.post('https://saltandglitz-api.vercel.app/v1/wishlist/create_wishlist', cartItem);
  //     console.log(res);

  //     if (res.status === 201) {
  //       await axios.delete(`https://saltandglitz-api.vercel.app/v1/wishlist/remove_wishlist/${user._id}/${id}`);
  //       setWishlistItems(wishlistItems.filter((item) => item.productId.product_id !== id) // Adjust key if needed
  //       );
  //       dispatch(cartAction.addToWishlist({ id }));
  //       toast.success("Item moved to cart", {
  //         position: "top-center",
  //         autoClose: 1000,
  //       });
  //       navigate('/cart');
  //     } else {
  //       toast.error("Error adding item to cart", {
  //         position: "top-center",
  //         autoClose: 1000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error moving item to cart:', error);
  //     toast.error("Error processing your request", {
  //       position: "top-center",
  //       autoClose: 1000,
  //     });
  //   }
  // };

  const handleMoveToCart = async (item, id) => {
    if (!item || !item.productId || !item.productId.product_id) {
      console.error('Invalid product ID:', id);
      toast.error("Product not found or invalid", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
  
    const cartItem = {
      product_id: item.productId.product_id,
      userId: user._id,
    };
  
    // console.log('Cart Item:', cartItem);
  
    try {
      const res = await axios.post('https://saltandglitz-api.vercel.app/v1/wishlist/create_wishlist', cartItem);
      console.log('Response:', res);
  
      if (res.status === 201) {
        await axios.delete(`https://saltandglitz-api.vercel.app/v1/wishlist/remove_wishlist/${user._id}/${id}`);
        setWishlistItems((prevItems) => prevItems.filter((item) => item.productId.product_id !== id));
        dispatch(cartAction.addToWishlist({ id }));
        toast.success("Item moved to cart", {
          position: "top-center",
          autoClose: 1000,
        });
        navigate('/cart');
      } else {
        toast.error("Error adding item to cart", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error('Error moving item to cart:', error);
      toast.error("Error processing your request", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };
  


  useEffect(() => {
    Aos.init();
    fetchWishlist(); // Fetch wishlist when the component loads
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
                          <i className='ri-shopping-cart-2-fill align-middle wishlist_cart'
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
