import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  id: string
  name: string
  price_clp: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id)
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          }
        }
        return { items: [...state.items, item] }
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
      })),
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price_clp * item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
