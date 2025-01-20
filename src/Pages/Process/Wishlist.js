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

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]); // Local state for wishlist items
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(true); // Loader state


  // Fetch wishlist items from backend
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`https://saltandglitz-api.vercel.app/v1/wishlist/get_wishlist/${user._id}`);
      if (response.status === 200) {
        setWishlistItems(response.data.wishlist.products); // Update the local state with fetched data
      }
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      toast.error("Failed to load wishlist", {
        position: "top-center",
        autoClose: 1000,
      });
    } finally {
      setLoading(false); // Stop loader after fetching data
    }
  };

  // Remove from wishlist
  const handleRemove = async (id) => {
    try {
      await axios.post(`https://saltandglitzapi-rkm5g.kinsta.app/v1/wishlist/remove-wishlist/${id}`);
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Remove item locally
      toast.success("Item removed from wishlist", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      toast.error("Error removing item from wishlist", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  // Add to cart and remove from wishlist
  const handleMoveToCart = async (item, id) => {
    const cartItem = {
      id: item.id,
      title: item.title,
      image01: item.image01,
      total14KT: item.total14KT,
    };

    try {
      const cartResponse = await axios.post('https://saltandglitzapi-rkm5g.kinsta.app/v1/carts/add', cartItem);
      if (cartResponse.status === 201) {
        await axios.post(`https://saltandglitzapi-rkm5g.kinsta.app/v1/wishlist/remove-wishlist/${id}`);
        setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Remove item locally
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
                            onClick={() => handleMoveToCart(item, item.productId.product_id)}>
                          </i>
                          <i className='ri-close-line wishlist_close_icon'
                            onClick={() => handleRemove(item.productId.product_id)}>
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
      </section>
    </Helmet>
  );
};

export default Wishlist;
