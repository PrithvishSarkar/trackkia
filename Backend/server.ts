import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import testConnection from "./testConnection.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config({ path: "./.env" }); // Defining Environment Variable path.
testConnection(); // Connecting to MySQL Database.

const app = express();
const PORT = process.env.PORT || 4000;

/* Middlewares starts here */
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:4000",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(cookieParser());
app.use("/api", authRouter);
/* Middlewares ends here */

app.get("/", (_, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Backend Working Successfully!" });
  return;
});

app.listen(PORT, () => {
  console.info(`Listening to PORT ${PORT}`);
});
