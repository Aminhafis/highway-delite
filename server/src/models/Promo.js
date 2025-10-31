import mongoose from 'mongoose';

const PromoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountValue: { type: Number, required: true }, // e.g. 10 for SAVE10
  type: { type: String, enum: ['percent', 'flat'], default: 'flat' },
  active: { type: Boolean, default: true }
});

export default mongoose.model('Promo', PromoSchema);
