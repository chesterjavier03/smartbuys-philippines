import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: false, unique: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    image: Buffer,
    price: { type: Number, required: true },
    brand: { type: String, required: false },
    rating: { type: Number, required: false, default: 0 },
    numReviews: { type: Number, required: false, default: 0 },
    countInStock: { type: Number, required: false, default: 0 },
    description: { type: String, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
