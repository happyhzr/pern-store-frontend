import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeftIcon } from "lucide-react";

import { useProductStore } from "../store/useProductStore";


export default function ProductPage() {
    const { currentProduct, formData, setForm, loading, error, fetchProduct, updateProduct, deleteProduct } = useProductStore()
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetchProduct(id)
    }, [])
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-spinner loading-lg" />
            </div>
        )
    }
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="alert alert-error">
                    {error}
                </div>
            </div>
        )
    }
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <button onClick={() => navigate('/')} className="btn btn-ghost mb-8">
                <ArrowLeftIcon className="size-4 mr-2" />
                Back to Products
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
                    {
                        currentProduct && (<img src={currentProduct.image} alt={currentProduct.name} className="size-full object-cover" />)
                    }
                </div>
                {/* <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6">
                            Edit Product
                        </h2>
                        <form onSubmit={e => {
                            e.preventDefault()
                            updateProduct(id)
                        }} className="space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-medium">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    className="input input-bordered w-full"
                                    value={formData.name}
                                    onChange={(e) => setForm({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </form>
                    </div>
                </div> */}
            </div>
        </div>
    );
}