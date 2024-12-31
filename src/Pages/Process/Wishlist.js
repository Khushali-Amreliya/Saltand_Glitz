import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EmptyState from '../EmptyState';
import { cartAction } from '../../Store/Slice/CartSlice';
import { formatCurrency } from '../../Utils/formateCurrency';
import Aos from 'aos';
import "aos/dist/aos.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import Helmet from '../../Components/Helmet';
import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const wishlistItem = useSelector(state => state.cart.wishlistItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Remove from wishlist
  const handleRemove = async (id) => {
    try {
      // Call the API to remove the item from the wishlist
      await axios.post(`https://saltandglitzapi-rkm5g.kinsta.app/v1/wishlist/remove-wishlist/${id}`);
      dispatch(cartAction.removeFromWishlist(id));
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
      price: item.price,
      image01: item.image01,
      totalprice: item.totalprice
    };

    try {
      // Add the item to the cart first
      const cartResponse = await axios.post('https://saltandglitzapi-rkm5g.kinsta.app/v1/carts/add', cartItem);

      // If the item was added to the cart successfully, proceed to remove it from the wishlist
      if (cartResponse.status === 201) {
        const removeWishlistResponse = await axios.post(`https://saltandglitzapi-rkm5g.kinsta.app/v1/wishlist/remove-wishlist/${id}`);

        // After removing from the wishlist, update the Redux store
        if (removeWishlistResponse.status === 200) {
          // Add item to the cart in the Redux store
          dispatch(cartAction.addItem(cartResponse.data));

          // Remove item from the wishlist in the Redux store
          dispatch(cartAction.removeFromWishlist(item.id));

          // Navigate to the cart page
          navigate('/cart');
        } else {
          toast.error("Error removing item from wishlist", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      } else {
        toast.error("Error adding item to cart", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error('Error handling item move to cart:', error);
      toast.error("Error processing your request", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };


  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Helmet title="Wishlist">
      <section className='container py-5'>
        {
          wishlistItem.length > 0 ? (
            <section className='wishlist-items'>
              <div className='row'>
                {
                  wishlistItem.map((item) => (
                    <div key={item.id} className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6' data-aos="zoom-in-up" data-aos-duration="2000">
                      <div className='card border-0'>
                        <Link to={`/Productdetails/${item.id}`}>
                          <img alt={item.title} src={item.image01} className='position-relative'></img>
                        </Link>
                        <div className='card-body d-flex justify-content-between align-items-center'>
                          <div>
                            <p className='m-0'>{formatCurrency(item.price)}</p>
                            <h6 className='d-inline-block'>{item.title}</h6>
                          </div>
                          <i className='ri-shopping-cart-2-fill align-middle wishlist_cart'
                            onClick={() => handleMoveToCart(item)}>
                          </i>
                          <i className='ri-close-line wishlist_close_icon'
                            onClick={() => handleRemove(item.id)}>
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
