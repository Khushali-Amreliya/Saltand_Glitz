import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';

const cartItems = localStorage.getItem("cartItem") !== null ? JSON.parse(localStorage.getItem("cartItem")) : [];
const totalQuantity = localStorage.getItem("totalQuantity") !== null ? JSON.parse(localStorage.getItem("totalQuantity")) : 0;
const subtotal = localStorage.getItem("subtotal") !== null ? JSON.parse(localStorage.getItem("subtotal")) : 0;
const discount = localStorage.getItem("discount") !== null ? JSON.parse(localStorage.getItem("discount")) : 0;

const wishlistItems = localStorage.getItem("wishlistItem") !== null ? JSON.parse(localStorage.getItem("wishlistItem")) : [];

const setItem = (items, totalQuantity, subtotal, discount) => {
    localStorage.setItem("cartItem", JSON.stringify(items));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    localStorage.setItem("subtotal", JSON.stringify(subtotal));
    localStorage.setItem("discount", JSON.stringify(discount));
};

const setWishlist = (wishlist) => {
    localStorage.setItem("wishlistItem", JSON.stringify(wishlist));
};

const initialState = {
    cartItem: cartItems,
    wishlistItem: wishlistItems,
    totalQuantity: totalQuantity,
    subtotal: subtotal, // Add subtotal
    totalAmount: subtotal - (subtotal * (discount / 100)), // Calculate total amount with discount
    discount: discount,
    error: null // Add error state
};

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItem.find(item => item.id === newItem.id);

            state.totalQuantity++;
            if (!existingItem) {
                state.cartItem.push({
                    id: newItem.id,
                    title: newItem.title,
                    image01: newItem.image01,
                    price: newItem.price,
                    quantity: 1,
                    totalprice: newItem.price
                });
            } else {
                existingItem.quantity++;
                existingItem.totalprice = Number(existingItem.totalprice) + Number(newItem.price);
            }

            // Calculate subtotal (without discount)
            state.subtotal = state.cartItem.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);

            // Calculate total amount with discount
            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));

            // Update localStorage
            setItem(state.cartItem, state.totalQuantity, state.subtotal, state.discount);
        },
        removeItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItem.find(item => item.id === newItem.id);

            if (!existingItem) return;

            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.cartItem = state.cartItem.filter(item => item.id !== newItem.id);
            } else {
                existingItem.quantity--;
                existingItem.totalprice = Number(existingItem.totalprice) - Number(newItem.price);
            }

            // Calculate subtotal (without discount)
            state.subtotal = state.cartItem.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);

            // Calculate total amount with discount
            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));

            // Update localStorage
            setItem(state.cartItem, state.totalQuantity, state.subtotal, state.discount);
        },
        deleteItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItem.find(item => item.id === newItem.id);

            if (!existingItem) return;

            state.cartItem = state.cartItem.filter(item => item.id !== newItem.id);
            state.totalQuantity -= existingItem.quantity;

            // Calculate subtotal (without discount)
            state.subtotal = state.cartItem.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);

            // Calculate total amount with discount
            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));

            // Update localStorage
            setItem(state.cartItem, state.totalQuantity, state.subtotal, state.discount);
        },
        applyCoupon(state, action) {
            const discountCode = action.payload;
            let discountPercent = 0;
            let errorMessage = null;

            if (discountCode === "PERFECT3") {
                discountPercent = 3;
            } else if (discountCode === "SHAYAUPSELL10") {
                discountPercent = 10;
            } else if (discountCode === "MOUNT5") {
                discountPercent = 5;
            } else {
                errorMessage = "Invalid coupon code"; // Set error message for invalid codes
                discountPercent = 0; // No discount applied
            }

            state.discount = discountPercent;

            // Calculate subtotal (without discount)
            state.subtotal = state.cartItem.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);

            // Calculate total amount with discount
            state.totalAmount = state.subtotal - (state.subtotal * (discountPercent / 100));

            // Update localStorage
            setItem(state.cartItem, state.totalQuantity, state.subtotal, state.discount);

            // Handle error message
            if (errorMessage) {
                Swal.fire({
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            } else {
                Swal.fire({
                    title: 'Success!',
                    text: `Discount of ${discountPercent}% applied.`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                    timer: 3000,
                    timerProgressBar: true
                });
            }
        },

        // Wishlist actions
        addToWishlist(state, action) {
            const newItem = action.payload;
            const existingItem = state.wishlistItem.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.wishlistItem.push({
                    id: newItem.id,
                    title: newItem.title,
                    image01: newItem.image01,
                    price: newItem.price
                });
            }

            // Update localStorage for wishlist
            setWishlist(state.wishlistItem);
        },
        removeFromWishlist(state, action) {
            const itemId = action.payload;
            state.wishlistItem = state.wishlistItem.filter(item => item.id !== itemId);

            // Update localStorage for wishlist
            setWishlist(state.wishlistItem);
        }
    }
});

export const cartAction = cartSlice.actions;
export default cartSlice;
