// CartContext.js
import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const updatedCartAdd = [...state, action.payload];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartAdd));
      return updatedCartAdd;
    case 'REMOVE_ITEM':
      const updatedCartRemove = state.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartRemove));
      return updatedCartRemove;
    case 'CLEAR_CART':
      localStorage.removeItem('cartItems');
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, dispatch] = useReducer(cartReducer, storedCartItems);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
