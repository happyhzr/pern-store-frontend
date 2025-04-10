import { Package2Icon, DollarSignIcon, ImageIcon, PlusCircleIcon } from "lucide-react"

import { useProductStore } from "../store/useProductStore"

export default function AddProductModal() {
    const { addProduct, formData, setForm, loading } = useProductStore()
    return (
        <dialog id="add_product_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        X
                    </button>
                </form>
                <h3 className="font-bold text-xl mb-8">
                    Add New Product
                </h3>
                <div className="space-y-6">
                    <div className="grid gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Product Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                    <Package2Icon className="size-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                    value={formData.name}
                                    onChange={(e) => setForm({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Price</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                    <DollarSignIcon className="size-5" />
                                </div>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                    value={formData.price}
                                    onChange={(e) => setForm({ ...formData, price: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Image URL</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                    <ImageIcon className="size-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="https://example.com/image.jpg"
                                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                    value={formData.image}
                                    onChange={(e) => setForm({ ...formData, image: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost">Cancel</button>
                        </form>
                        <button
                            type="submit"
                            className="btn btn-primary min-w-[120px]"
                            disabled={!formData.name || !formData.price || !formData.image || loading}
                            onClick={addProduct}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                <>
                                    <PlusCircleIcon className="size-5 mr-2" />
                                    Add Product
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}