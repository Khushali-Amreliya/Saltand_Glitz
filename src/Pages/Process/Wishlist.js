import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EmptyState from '../EmptyState';
import { cartAction } from '../../Store/Slice/CartSlice';
import { formatCurrency } from '../../Utils/formateCurrency';

const Wishlist = () => {
  const wishlistItem = useSelector(state => state.cart.wishlistItem);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(cartAction.removeFromWishlist(id));
  };

  return (
    <>
      <section className='container py-5'>
        {
          wishlistItem.length > 0 ? (
            <section className='wishlist-items'>
              <div className='row'>
                {
                  wishlistItem.map((item) => (
                    <div key={item.id} className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
                      <div className='card border-0'>
                        <img alt={item.title} src={item.image01} className='position-relative'></img>
                        <div className='card-body'>
                          <p className='m-0'>{formatCurrency(item.price)}</p>
                          <h6>{item.title}</h6>
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
    </>
  );
}

export default Wishlist;