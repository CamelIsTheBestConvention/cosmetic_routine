import "reflect-metadata";
import express from "express";
import cors from "cors";
import { initializeDatabase } from "./config/ormconfig";
import { setupRoutes } from "./routes/routes";
import dotenv from "dotenv";
import morgan from "morgan";
import app from "./app";
import createRateLimiter from "./middlewares/rate-limit.middleware";
import https from "https";
import fs from "fs";

dotenv.config();
const PORT = process.env.PORT || 3000;

const httpsOptions = {
  key: fs.readFileSync("./certs/private.key", "utf8"),
  cert: fs.readFileSync("./certs/certificate.crt", "utf8"),
};

const allowedOrigins = [
  "http://corou-client.s3-website.ap-northeast-2.amazonaws.com/",
  "https://d2lyohpia77fn1.cloudfront.net/",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: allowedOrigins, // Replace with your allowed origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use(morgan("combined"));

const rateLimiter = createRateLimiter();
app.use(rateLimiter);

async function startServer() {
  try {
    await initializeDatabase();
    console.log("Database initialized successfully");

    setupRoutes(app);

    https.createServer(httpsOptions, app).listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Database connected to:", process.env.DB_HOST);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
