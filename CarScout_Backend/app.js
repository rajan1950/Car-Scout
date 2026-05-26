const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS - Must be FIRST
const allowedOrigins = [
  "https://car-scout-pied.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

if (process.env.CORS_ORIGINS) {
  process.env.CORS_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
    .forEach((origin) => allowedOrigins.push(origin));
}

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  return /^http:\/\/localhost:\d+$/.test(origin);
};

app.use(cors({
  origin: function (origin, callback) {
    if (process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Fix: use regex instead of "*"
app.options(/(.*)/, cors());

// Middleware
app.use(express.json());

// Database Connection
const DBConnection = require("./src/utils/DBConnection");
DBConnection();

const mountRoute = (basePath, router) => {
  app.use(basePath, router);
  app.use(`/api${basePath}`, router);
};

// Routes
const userRoutes = require("./src/routes/UserRoutes");
mountRoute("/user", userRoutes);

const carRoutes = require("./src/routes/CarRoutes");
mountRoute("/car", carRoutes);

const inquiryRoutes = require("./src/routes/InquiryRoutes");
mountRoute("/inquiry", inquiryRoutes);

const adminRoutes = require("./src/routes/AdminRoutes");
mountRoute("/admin", adminRoutes);

const messageRoutes = require("./src/routes/MessageRoutes");
mountRoute("/message", messageRoutes);

const reviewRoutes = require("./src/routes/ReviewRoutes");
mountRoute("/reviews", reviewRoutes);

const testDriveRoutes = require("./src/routes/TestDriveRoutes");
mountRoute("/testdrive", testDriveRoutes);

const notificationRoutes = require("./src/routes/NotificationRoutes");
mountRoute("/notification", notificationRoutes);

const wishlistRoutes = require("./src/routes/WishlistRoutes");
mountRoute("/wishlist", wishlistRoutes);

const bookingRoutes = require("./src/routes/BookingRoutes");
mountRoute("/booking", bookingRoutes);

const reportRoutes = require("./src/routes/ReportRoutes");
mountRoute("/report", reportRoutes);

const emailRoutes = require("./src/routes/EmailRoutes");
mountRoute("/email", emailRoutes);

const offerRoutes = require("./src/routes/offerRoutes");
mountRoute("/offer", offerRoutes);

// Test Drive Reminder Worker
const { startTestDriveReminderWorker } = require("./src/controller/TestDriveController");

// Default Route
app.get("/", (req, res) => {
  res.send("Car Scout Backend API Running...");
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, service: "carscout-backend" });
});

// PORT
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  startTestDriveReminderWorker();
  console.log(`Server is running on port ${PORT}`);
});