import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config";
import authRoutes from "./routes/authRoutes"

dotenv.config();

const app = express();

connectToDatabase();

app.use('/api/auth', authRoutes);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));





const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});