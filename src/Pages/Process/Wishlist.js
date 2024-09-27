import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EmptyState from '../EmptyState';
import { cartAction } from '../../Store/Slice/CartSlice';
import { formatCurrency } from '../../Utils/formateCurrency';
import Aos from 'aos';
import "aos/dist/aos.css";

const Wishlist = () => {
  const wishlistItem = useSelector(state => state.cart.wishlistItem);
  const dispatch = useDispatch();

  // Remove from wishlist
  const handleRemove = (id) => {
    dispatch(cartAction.removeFromWishlist(id));
  };

  // Add to cart and remove from wishlist
  const handleMoveToCart = (item) => {
    dispatch(cartAction.addItem(item));
    dispatch(cartAction.removeFromWishlist(item.id));
  };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section className='container py-5'>
      {
        wishlistItem.length > 0 ? (
          <section className='wishlist-items'>
            <div className='row'>
              {
                wishlistItem.map((item) => (
                  <div key={item.id} className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6' data-aos="zoom-in-up" data-aos-duration="2000">
                    <div className='card border-0'>
                      <img alt={item.title} src={item.image01} className='position-relative'></img>
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
  );
};

export default Wishlist;
