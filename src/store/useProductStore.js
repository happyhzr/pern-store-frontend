import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

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
                set({ error: "Too many requests. Please try again later.", products: [] })
            } else {
                set({ error: "An error occurred while fetching products.", products: [] })
            }
        } finally {
            set({ loading: false })
        }
    },
    deleteProduct: async (id) => {
        set({ loading: true })
        try {
            await axios.delete(`${BASE_URL}/api/v1/products/${id}`)
            set(prev => ({ products: prev.products.filter(product => product.id !== id) }))
            toast.success("Product deleted successfully")
        } catch (err) {
            console.log("Error deleting product:", err)
            toast.error("Error deleting product")
            if (err.status === 429) {
                set({ error: "Too many requests. Please try again later." })
            } else {
                set({ error: "An error occurred while deleting the product." })
            }
        } finally {
            set({ loading: false })
        }
    },
}))