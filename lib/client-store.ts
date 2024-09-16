import { create } from 'zustand';
import { persist } from "zustand/middleware"

export type CartItem = {
  name: string
  image: string
  id: string
  price: number
  quantity: number
}

export type CartState = {
  cart: CartItem[]
  checkoutProgress: 'cart-page' | 'payment-page' | 'confirmation-page'
  setCheckoutProgress: (
    val: 'cart-page' | 'payment-page' | 'confirmation-page'
  ) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
  clearCart: () => void
  cartOpen: boolean
  setCartOpen: (val: boolean) => void
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      cartOpen: false,
      setCartOpen: (val) => set({ cartOpen: val }),
      clearCart: () => set({ cart: [] }),
      checkoutProgress: 'cart-page',
      setCheckoutProgress: (val) => set((state) => ({ checkoutProgress: val })),
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === item.id) {
              return { ...cartItem, quantity: cartItem.quantity + item.quantity };
            }
            return cartItem;
          })
          return { cart: updatedCart };
        } else {
          return {
            cart: [
              ...state.cart, {...item, quantity: item.quantity}
            ]
          }
        }
      }),
      removeFromCart: (item) => set((state) => {
        const updatedCart = state.cart.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          }
          return cartItem;
        })
        return {
          cart: updatedCart.filter((item) => item.quantity > 0)
        }
      })

    }),
    {name: 'cart-storage'}
  )
)