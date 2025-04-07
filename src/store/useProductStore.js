import { create } from "zustand";
import axios from "axios";

const BASE_URL = 'http://localhost:3000'

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    fetchProducts: async () => {
        set({ loading: true })
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/products`)
            set({ products: response.data.data, error: null })
        } catch (err) {
            if (err.status === 429) {
                set({ error: "Too many requests. Please try again later." })
            } else {
                set({ error: "An error occurred while fetching products." })
            }
        } finally {
            set({ loading: false })
        }
    },
}))