import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  date: String,
  time: String,
  available: { type: Boolean, default: true },
});

const ExperienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String,
  location: String,
  price: { type: Number, required: true }, 
  slots: [{
    date: String,
    time: String,
    available: { type: Boolean, default: true }
  }]
}, { timestamps: true });



export default mongoose.model("Experience", ExperienceSchema);
