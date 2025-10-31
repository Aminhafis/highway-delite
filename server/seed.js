import mongoose from 'mongoose';
import Experience from './src/models/Experience.js';
import Promo from './src/models/Promo.js';
import dotenv from 'dotenv';

dotenv.config();

const experiences = [
  {
    name: "Beach Yoga Retreat",
    description: "Early morning yoga with sound of waves and golden sand.",
    location: "Goa",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    price: 899,  
    slots: [
      {date: "2025-11-10", time: "06:00", available: true},
      {date: "2025-11-10", time: "08:00", available: true},
      {date: "2025-11-11", time: "06:00", available: true},
      {date: "2025-11-11", time: "08:00", available: true},
      {date: "2025-11-12", time: "06:00", available: true},
      {date: "2025-11-15", time: "06:00", available: true},
      {date: "2025-11-15", time: "08:00", available: false},
      {date: "2025-11-16", time: "06:00", available: true},
      {date: "2025-11-16", time: "08:00", available: true},
      {date: "2025-11-17", time: "06:00", available: true},
      {date: "2025-11-17", time: "08:00", available: true},
      {date: "2025-11-16", time: "08:00", available: true},
      {date: "2025-11-16", time: "10:00", available: true},
      {date: "2025-11-18", time: "08:00", available: true},
      {date: "2025-11-18", time: "10:00", available: true},
    ]
  },
  {
    name: "Mountain Trekking Adventure",
    description: "Explore scenic mountain trails with professional guides.",
    location: "Manali",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    price: 999,  
    slots: [
      {date: "2025-11-15", time: "08:00", available: true},
      {date: "2025-11-15", time: "10:00", available: true},
      {date: "2025-11-16", time: "08:00", available: true},
      {date: "2025-11-16", time: "10:00", available: true},
      {date: "2025-11-18", time: "08:00", available: true},
      {date: "2025-11-18", time: "10:00", available: true},
      {date: "2025-12-06", time: "19:00", available: true},
      {date: "2025-12-07", time: "17:00", available: true},
      {date: "2025-12-07", time: "19:00", available: true},
      {date: "2025-12-08", time: "17:00", available: true},
    ]
  },
  {
    name: "Mysore Dasara Festival Experience",
    description: "Experience the grandeur of Karnataka's royal Dasara festival with processions, cultural shows, and palace illuminations.",
    location: "Mysore, Karnataka",
    imageUrl: "https://images.pexels.com/photos/29604731/pexels-photo-29604731.jpeg",
    price: 1599,
    slots: [
      {date: "2025-12-05", time: "17:00", available: true},
      {date: "2025-12-05", time: "19:00", available: true},
      {date: "2025-12-06", time: "17:00", available: true},
      {date: "2025-12-06", time: "19:00", available: true},
      {date: "2025-12-07", time: "17:00", available: true},
      {date: "2025-12-07", time: "19:00", available: true},
      {date: "2025-12-08", time: "17:00", available: true},
      {date: "2025-12-08", time: "19:00", available: true},
      {date: "2025-11-17", time: "08:00", available: true},
      {date: "2025-11-17", time: "10:00", available: false},
      {date: "2025-11-18", time: "08:00", available: true},
      {date: "2025-11-18", time: "10:00", available: true},
    ]
  },
  {
    name: "Alappuzha House Boat Stay",
    description: "Witness the legendary boat Stay with traditional, in Kerala's backwaters.",
    location: "Alappuzha, Kerala",
    imageUrl: "https://images.pexels.com/photos/12066477/pexels-photo-12066477.jpeg",
    price: 1199,
    slots: [
      {date: "2025-12-01", time: "14:00", available: true},
      {date: "2025-12-01", time: "16:00", available: false},
      {date: "2025-12-02", time: "14:00", available: true},
      {date: "2025-12-02", time: "16:00", available: true},
      {date: "2025-12-03", time: "14:00", available: true},
      {date: "2025-12-03", time: "16:00", available: true},
      {date: "2025-12-07", time: "14:00", available: true},
      {date: "2025-12-07", time: "16:00", available: true},
      {date: "2025-11-17", time: "08:00", available: true},
      {date: "2025-11-17", time: "10:00", available: false},
      {date: "2025-11-18", time: "08:00", available: true},
      {date: "2025-11-18", time: "10:00", available: true},
    ]
  },
  {
    name: "Desert Safari Experience",
    description: "Thrilling dune bashing and camel rides in the golden desert.",
    location: "Rajasthan",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
    price: 1499,  
    slots: [
      {date: "2025-11-15", time: "08:00", available: false},
      {date: "2025-11-15", time: "10:00", available: true},
      {date: "2025-11-16", time: "08:00", available: true},
      {date: "2025-11-16", time: "10:00", available: true},
      {date: "2025-11-17", time: "08:00", available: true},
      {date: "2025-11-17", time: "10:00", available: false},
      {date: "2025-11-18", time: "08:00", available: true},
      {date: "2025-11-18", time: "10:00", available: true},
    ]
  },
  {
    name: "Scuba Diving Adventure",
    description: "Explore vibrant coral reefs and marine life underwater.",
    location: "Andaman",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    price: 2499,  
    slots: [
      {date: "2025-11-20", time: "09:00", available: true},
      {date: "2025-11-20", time: "11:00", available: true},
      {date: "2025-11-20", time: "14:00", available: false},
      {date: "2025-11-21", time: "14:00", available: true},
      {date: "2025-11-22", time: "09:00", available: true},
      {date: "2025-11-22", time: "11:00", available: true},
    ]
  },
  {
    name: "Wildlife Safari",
    description: "Spot tigers, elephants, and exotic birds in their natural habitat.",
    location: "Jim Corbett",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    price: 1799,  
    slots: [
      {date: "2025-11-22", time: "06:00", available: true},
      {date: "2025-11-22", time: "08:00", available: true},
      {date: "2025-11-23", time: "06:00", available: true},
      {date: "2025-11-23", time: "08:00", available: true},
      {date: "2025-11-24", time: "06:00", available: true},
      {date: "2025-11-24", time: "08:00", available: true},
      {date: "2025-11-25", time: "06:00", available: true},
      {date: "2025-11-25", time: "08:00", available: true},
    ]
  },
  {
    name: "Kanyakumari Sunrise & Sunset",
    description: "Witness the rare phenomenon where you can see both sunrise and sunset from the same spot at India's southernmost tip.",
    location: "Kanyakumari, Tamil Nadu",
    imageUrl: "https://images.pexels.com/photos/9504331/pexels-photo-9504331.jpeg",
    price: 899,
    slots: [
      {date: "2025-12-10", time: "05:30", available: true},
      {date: "2025-12-10", time: "18:00", available: true},
      {date: "2025-12-11", time: "05:30", available: true},
      {date: "2025-12-11", time: "18:00", available: true},
      {date: "2025-12-12", time: "05:30", available: true},
      {date: "2025-12-12", time: "18:00", available: true},
      {date: "2025-12-13", time: "05:30", available: true},
      {date: "2025-12-13", time: "18:00", available: true},
    ]
  },
  {
    name: "Hampi Heritage Cycling Tour",
    description: "Cycle through the ancient ruins of Vijayanagara Empire, exploring temples, boulder landscapes, and UNESCO World Heritage sites.",
    location: "Hampi, Karnataka",
    imageUrl: "https://images.pexels.com/photos/3936815/pexels-photo-3936815.jpeg",
    price: 1099,
    slots: [
      {date: "2025-12-15", time: "07:00", available: true},
      {date: "2025-12-15", time: "09:00", available: true},
      {date: "2025-12-15", time: "16:00", available: true},
      {date: "2025-12-16", time: "07:00", available: true},
      {date: "2025-12-16", time: "09:00", available: false},
      {date: "2025-12-16", time: "16:00", available: true},
      {date: "2025-12-17", time: "07:00", available: true},
      {date: "2025-12-17", time: "09:00", available: false},
    ]
  }
];


const promos = [
  {
    code: "SAVE10",
    discountValue: 10,
    type: "percent",
    active: true
  },
  {
    code: "SAVE20",
    discountValue: 20,
    type: "percent",
    active: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' Connected to MongoDB');
    
    await Experience.deleteMany({});
    await Promo.deleteMany({});
    console.log('  Cleared old data');
    
    await Experience.insertMany(experiences);
    await Promo.insertMany(promos);
    
    console.log(' Seeded 6 experiences');
    console.log(' Seeded 2 promo codes');
    console.log(' Database ready!');
    
    mongoose.disconnect();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedDB();
