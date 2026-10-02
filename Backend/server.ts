// Importing and defining path of all the environment variables first.
import path from "path";
import { config } from "dotenv";
config({ path: path.resolve(process.cwd(), ".env") });

import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.set("trust proxy", 1);

/* Middlewares starts here */
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/task", taskRouter);
/* Middlewares ends here */

app.listen(PORT, () => {
  console.info(`Listening to PORT ${PORT}`);
});
