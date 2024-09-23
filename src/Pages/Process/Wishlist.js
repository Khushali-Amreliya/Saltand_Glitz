// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import EmptyState from '../EmptyState';
// import { cartAction } from '../../Store/Slice/CartSlice';
// import { formatCurrency } from '../../Utils/formateCurrency';

// const Wishlist = () => {
//   const wishlistItem = useSelector(state => state.cart.wishlistItem);
//   const dispatch = useDispatch();

//   // Fetch wishlist from backend when component loads
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/wishlist'); // Adjust the API URL accordingly
//         dispatch(cartAction.setWishlist(response.data)); // Assuming you have a `setWishlist` action in your cart slice
//       } catch (error) {
//         console.error('Error fetching wishlist:', error);
//       }
//     };

//     fetchWishlist();
//   }, [dispatch]);

//   const handleRemove = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/wishlist/${id}`); // Adjust API URL accordingly
//       dispatch(cartAction.removeFromWishlist(id));
//     } catch (error) {
//       console.error('Error removing item from wishlist:', error);
//     }
//   };

//   return (
//     <section className='container py-5'>
//       {
//         wishlistItem.length > 0 ? (
//           <section className='wishlist-items'>
//             <div className='row'>
//               {
//                 wishlistItem.map((item) => (
//                   <div key={item.id} className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
//                     <div className='card border-0'>
//                       <img alt={item.title} src={item.image01} className='position-relative'></img>
//                       <div className='card-body'>
//                         <p className='m-0'>{formatCurrency(item.price)}</p>
//                         <h6>{item.title}</h6>
//                         <i className='ri-close-line wishlist_close_icon'
//                           onClick={() => handleRemove(item.id)}>
//                         </i>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               }
//             </div>
//           </section>
//         ) : (
//           <EmptyState />
//         )
//       }
//     </section>
//   );
// };

// export default Wishlist;

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
    <section className='container py-5'>
      {
        wishlistItem.length > 0 ? (
          <section className='wishlist-items'>
            <div className='row'>
              {
                wishlistItem.map((item) => (
                  <div key={item.id} className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6'>
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
  );
};

export default Wishlist;