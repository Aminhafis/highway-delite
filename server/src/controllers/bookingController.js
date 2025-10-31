import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";

export const createBooking = async (req, res) => {
  const { experienceId, slot, name, email, promoCode } = req.body;
  try {
    // Check if slot is available
    const experience = await Experience.findById(experienceId);
    const expSlot = experience.slots.find(s => s.date === slot.date && s.time === slot.time);

    if (!expSlot || !expSlot.available) {
      return res.status(400).json({ error: "Slot not available" });
    }

    // Create booking
    const booking = new Booking({ experienceId, slot, name, email, promoCode });
    await booking.save();

    // Mark slot unavailable
    expSlot.available = false;
    await experience.save();

    res.status(201).json({ success: true, bookingId: booking._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
