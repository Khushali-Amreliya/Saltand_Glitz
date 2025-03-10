import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const parseJSON = (value) => {
    try {
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        return null;
    }
};

// const cartItems = parseJSON(localStorage.getItem("cartItem")) || [];
const wishlistItems = parseJSON(localStorage.getItem("wishlistItem")) || [];
const totalQuantity = parseJSON(localStorage.getItem("totalQuantity")) || 0;
const subtotal = parseJSON(localStorage.getItem("subtotal")) || 0;
const discount = parseJSON(localStorage.getItem("discount")) || 0;


const setItem = (items, totalQuantity, subtotal, discount) => {
    localStorage.setItem("cartItem", JSON.stringify(items));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    localStorage.setItem("subtotal", JSON.stringify(subtotal));
    localStorage.setItem("discount", JSON.stringify(discount));
};

const setWishlist = (wishlist) => {
    localStorage.setItem("wishlistItem", JSON.stringify(wishlist));
};

const setRecentlyViewed = (recentlyViewed) => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
};
const getCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
    cartItems: getCartFromLocalStorage(),  // ✅ LocalStorage se cart load ho raha hai
    recentlyViewed: localStorage.getItem("recentlyViewed")
        ? JSON.parse(localStorage.getItem("recentlyViewed"))
        : [],
    wishlistItem: wishlistItems,
    totalQuantity: totalQuantity,
    subtotal: subtotal,
    totalAmount: subtotal - (subtotal * (discount / 100)),
    discount: discount,
    error: null
};
const setCartToLocalStorage = (cartItem) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem)); // ✅ LocalStorage update ho raha hai
};

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.cartItems.push({
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

            state.subtotal = state.cartItems.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);

            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));

            setCartToLocalStorage(state.cartItems); // ✅ LocalStorage update ho raha hai
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

            state.subtotal = state.cartItem.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);

            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));

            setItem(state.cartItem, state.totalQuantity, state.subtotal, state.discount);
        },

        // deleteItem(state, action) {
        //     const newItem = action.payload;
        //     const existingItem = state.cartItem.find(item => item.id === newItem.id);

        //     if (!existingItem) return;

        //     state.cartItem = state.cartItem.filter(item => item.id !== newItem.id);
        //     state.totalQuantity -= existingItem.quantity;

        //     state.subtotal = state.cartItem.reduce((total, item) =>
        //         total + Number(item.price) * Number(item.quantity), 0);

        //     if (state.cartItem.length === 0) {
        //         state.discount = 0;
        //     }

        //     state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));8

        //     setItem(state.cartItem, state.totalQuantity, state.subtotal, state.discount);
        // },

        deleteItem(state, action) {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== id);

            state.subtotal = state.cartItems.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);

            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));

            setCartToLocalStorage(state.cartItems); // ✅ LocalStorage se remove ho raha hai
        },



        addRecentlyViewed(state, action) {
            const newItem = action.payload;
            // console.log("New Recently Viewed Item:", newItem);

            const existingItem = state.recentlyViewed.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.recentlyViewed.unshift(newItem);
                if (state.recentlyViewed.length > 8) {
                    state.recentlyViewed.pop();
                }
                console.log("Updated Recently Viewed List:", state.recentlyViewed);
            }

            setRecentlyViewed(state.recentlyViewed); // Save to localStorage
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
                errorMessage = "Invalid coupon code";
                discountPercent = 0;
            }

            state.discount = discountPercent;

            state.subtotal = state.cartItem.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);

            state.totalAmount = state.subtotal - (state.subtotal * (discountPercent / 100));

            setItem(state.cartItem, state.totalQuantity, state.subtotal, state.discount);

            if (errorMessage) {
                toast.error(errorMessage);
            } else {
                toast.success(`Discount of ${discountPercent}% applied!`);
            }
        },

        addToWishlist(state, action) {
            const newItem = action.payload;
            const existingItem = state.wishlistItem.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.wishlistItem.push({
                    id: newItem.id,
                    title: newItem.title,
                    image01: newItem.image01,
                    total14KT: newItem.total14KT
                });
                // toast.success("Item added to wishlist!");
            }

            setWishlist(state.wishlistItem);
        },

        removeFromWishlist(state, action) {
            const itemId = action.payload;
            state.wishlistItem = state.wishlistItem.filter(item => item.id !== itemId);

            setWishlist(state.wishlistItem);
        },

        moveToWishlist(state, action) {
            const newItem = action.payload; // Ensure this has all necessary properties

            const existingItem = state.wishlistItem.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.wishlistItem.push({
                    id: newItem.id,
                    title: newItem.title,
                    image01: newItem.image01,
                    price: newItem.price
                });
            }

            setWishlist(state.wishlistItem);
        },

        clearCartAndWishlist(state) {
            state.cartItem = [];
            state.wishlistItem = [];
            state.totalQuantity = 0;
            state.subtotal = 0;
            state.totalAmount = 0;
            state.discount = 0;

            localStorage.removeItem('cartItem');
            localStorage.removeItem('totalQuantity');
            localStorage.removeItem('subtotal');
            localStorage.removeItem('discount');
            localStorage.removeItem('wishlistItem');
        }
    }
});

export const cartAction = cartSlice.actions;
export default cartSlice;
