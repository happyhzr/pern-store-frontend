import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    currentProduct: null,
    formData: {
        name: '',
        price: 0,
        image: '',
    },
    setForm: (formData) => set({ formData }),
    resetForm: () => set({ formData: { name: '', price: 0, image: '' } }),
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
    addProduct: async (e) => {
        set({ loading: true })
        try {
            const { formData, fetchProducts, resetForm } = get()
            await axios.post(`${BASE_URL}/api/v1/products`, formData)
            await fetchProducts()
            resetForm()
            toast.success("Product added successfully")
            document.getElementById("add_product_modal").close()
        } catch (err) {
            console.log("Error adding product:", err)
            toast.error("Error adding product")
            if (err.status === 429) {
                set({ error: "Too many requests. Please try again later." })
            } else {
                set({ error: "An error occurred while adding the product." })
            }
        } finally {
            set({ loading: false })
        }
    },
    fetchProduct: async (id) => {
        set({ loading: true })
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/products/${id}`)
            set({ currentProduct: response.data.data, formData: response.data.data, error: null })
        } catch (err) {
            toast.error("Error fetching product")
            if (err.status === 429) {
                set({ error: "Too many requests. Please try again later." })
            } else {
                set({ error: "An error occurred while fetching the product." })
            }
        } finally {
            set({ loading: false })
        }
    },
    updateProduct: async (id) => {
        set({ loading: true })
        try {
            const { formData } = get()
            const response = await axios.put(`${BASE_URL}/api/v1/products/${id}`, formData)
            set({ currentProduct: response.data.data, error: null })
            toast.success("Product updated successfully")
        } catch (err) {
            console.log("Error updating product:", err)
            toast.error("Error updating product")
            if (err.status === 429) {
                set({ error: "Too many requests. Please try again later." })
            } else {
                set({ error: "An error occurred while updating the product." })
            }
        } finally {
            set({ loading: false })
        }
    },
}))