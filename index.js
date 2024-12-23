import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/config.js";
import authRouter from "./Routers/authRouter.js";
import userRouter from "./Routers/userRouter.js";
import resortRouter from "./Routers/resortRouter.js";
import cateringRouter from "./Routers/cateringRouter.js"
import photographyRouter from "./Routers/photographyRouter.js"
import makeupRouter from "./Routers/makeupRouter.js"
import djRouter from "./Routers/djRouter.js"
import decorationRouter from "./Routers/decorationRouter.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my API" });
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/resort", resortRouter);
app.use("/api/catering",cateringRouter)
app.use("/api/photo",photographyRouter)
app.use("/api/makeup",makeupRouter)
app.use("/api/dj",djRouter)
app.use("/api/decor",decorationRouter)

// Board Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on`);
});
