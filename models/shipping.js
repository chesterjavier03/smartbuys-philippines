import mongoose from 'mongoose';

const shippingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      strictPopulate: 'false',
    },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Shipping =
  mongoose.models.Shipping || mongoose.model('Shipping', shippingSchema);

export default Shipping;
