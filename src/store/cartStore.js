import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (product, quantity = 1, color, size) => {
        const { items } = get();
        const key = `${product.id}-${color}-${size}`;
        const existing = items.find((i) => i.key === key);

        if (existing) {
          set({
            items: items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + quantity } : i
            ),
            isDrawerOpen: true,
          });
        } else {
          set({
            items: [...items, { key, product, quantity, color, size }],
            isDrawerOpen: true,
          });
        }
      },

      removeItem: (key) => {
        set({ items: get().items.filter((i) => i.key !== key) });
      },

      updateQuantity: (key, quantity) => {
        if (quantity < 1) {
          set({ items: get().items.filter((i) => i.key !== key) });
          return;
        }
        set({
          items: get().items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        });
      },

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set({ isDrawerOpen: !get().isDrawerOpen }),

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      get subtotal() {
        return get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        );
      },
    }),
    {
      name: 'wild-world-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;
