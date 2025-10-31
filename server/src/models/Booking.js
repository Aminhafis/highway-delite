import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
  slot: { date: String, time: String },
  name: String,
  email: String,
  promoCode: String,
});

export default mongoose.model("Booking", BookingSchema);
