import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import experiencesRoutes from "./routes/experiences.js";
import bookingsRoutes from "./routes/bookings.js";
import promoRoutes from "./routes/promo.js";

dotenv.config();

app.use(cors({
  origin: [
    'http://localhost:5173',                           
    'http://localhost:5050',                           
    'https://highway-delite-puce-ten.vercel.app',      
    'https://highway-delite-4ptj.onrender.com'        
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/experiences", experiencesRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/promo", promoRoutes);

const PORT = process.env.PORT || 5050;
connectDB();

app.listen(PORT, () => {
  console.log(`BookIt backend running at http://localhost:${PORT}`);
});