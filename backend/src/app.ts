import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./config";
import authRoutes from "./routes/authRoutes";
import imageRoutes from "./routes/ImageRoutes";

dotenv.config();
connectToDatabase();

const app = express();
// const FRONTEND_ORIGINS = [
//   "https://stock-image-platform-two.vercel.app",
//   "https://stock-image-platform-jeoi.vercel.app"
// ];

// app.use(
//   cors({
//     origin: FRONTEND_ORIGINS,
//     credentials: true,
//   })
// );


const FRONTEND_ORIGINS = [
  "https://stock-image-platform-two.vercel.app",
  "https://stock-image-platform-jeoi.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (FRONTEND_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

// API routes
app.use('/api/auth', authRoutes);
app.use("/api/image", imageRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
