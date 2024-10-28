import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

interface CartProduct extends Product {
  quantity: number;
  purchaseDate: string;
}

interface CartState {
  purchasedProducts: CartProduct[];
}

const initialState: CartState = {
  purchasedProducts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    purchaseProduct: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.purchasedProducts.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        // Update the quantity if it already exists
        existingProduct.quantity += 1;
      } else {
        // Add new product with quantity 1
        state.purchasedProducts.push({
          ...action.payload,
          purchaseDate: new Date().toISOString(),
          quantity: 1,
        });
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const existingProduct = state.purchasedProducts.find(
        (product) => product.id === action.payload
      );

      if (existingProduct && existingProduct.quantity > 1) {
        // Reduce the quantity if more than 1
        existingProduct.quantity -= 1;
      } else {
        // Remove the product if quantity is 1
        state.purchasedProducts = state.purchasedProducts.filter(
          (product) => product.id !== action.payload
        );
      }
    },
    clearOldPurchases: (state) => {
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
      state.purchasedProducts = state.purchasedProducts.filter(
        (product) => product.purchaseDate >= twoDaysAgo
      );
    },
  },
});

export const { purchaseProduct, removeProduct, clearOldPurchases } = cartSlice.actions;
export default cartSlice.reducer;
