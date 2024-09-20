import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EmptyState from '../EmptyState';
import { cartAction } from '../../Store/Slice/CartSlice';

const Wishlist = () => {
  const wishlistItem = useSelector(state => state.cart.wishlistItem);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(cartAction.removeFromWishlist(id));
  };

  return (
    <>
      <section className='container'>
        <div className='row'>
          {
            wishlistItem.length > 0 ? (
              <section className='wishlist-items'>
                {wishlistItem.map((item) => (
                  <div key={item.id} className='col-md-4'>
                    <div className='wishlist-card p-3 mb-3'>
                      <img 
                        src={item.image01} 
                        alt={item.title} 
                        className='img-fluid' 
                        style={{ height: '200px', objectFit: 'cover' }} 
                      />
                      <h5 className='mt-2'>{item.title}</h5>
                      <p className='text-muted'>₹{item.price}</p>
                      <button 
                        className='btn btn-danger' 
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove from Wishlist
                      </button>
                    </div>
                  </div>
                ))}
              </section>
            ) : (
              <EmptyState />
            )
          }
        </div>
      </section>
    </>
  );
}

export default Wishlist;
