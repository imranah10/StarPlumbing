import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  sno: {
    type: Number,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  buyingPrice: { type: String, required: true },
  sellingPrice: { type: String, required: true },
  unit: { type: String, required: true },
  nos: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
