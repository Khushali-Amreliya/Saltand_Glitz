import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Uorder = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = "your_user_id"; // You can get this from your authentication or user context

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/v1/carts/`);
        setCartItems(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  return (
    <div>
      <h2>Your Orders</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - {item.quantity} pcs - ${item.totalprice}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in your cart.</p>
      )}
    </div>
  );
};

export default Uorder;
