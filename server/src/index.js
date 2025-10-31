import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import experiencesRoutes from "./routes/experiences.js";
import bookingsRoutes from "./routes/bookings.js";
import promoRoutes from "./routes/promo.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/experiences", experiencesRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/promo", promoRoutes);

const PORT = process.env.PORT || 5050;
connectDB();

app.listen(PORT, () => {
  console.log(`BookIt backend running at http://localhost:${PORT}`);
});