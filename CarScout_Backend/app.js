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

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
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

// Routes
const userRoutes = require("./src/routes/UserRoutes");
app.use("/user", userRoutes);

const carRoutes = require("./src/routes/CarRoutes");
app.use("/car", carRoutes);

const inquiryRoutes = require("./src/routes/InquiryRoutes");
app.use("/inquiry", inquiryRoutes);

const adminRoutes = require("./src/routes/AdminRoutes");
app.use("/admin", adminRoutes);

const messageRoutes = require("./src/routes/MessageRoutes");
app.use("/message", messageRoutes);

const reviewRoutes = require("./src/routes/ReviewRoutes");
app.use("/reviews", reviewRoutes);

const testDriveRoutes = require("./src/routes/TestDriveRoutes");
app.use("/testdrive", testDriveRoutes);

const notificationRoutes = require("./src/routes/NotificationRoutes");
app.use("/notification", notificationRoutes);

const wishlistRoutes = require("./src/routes/WishlistRoutes");
app.use("/wishlist", wishlistRoutes);

const bookingRoutes = require("./src/routes/BookingRoutes");
app.use("/booking", bookingRoutes);

const reportRoutes = require("./src/routes/ReportRoutes");
app.use("/report", reportRoutes);

const emailRoutes = require("./src/routes/EmailRoutes");
app.use("/email", emailRoutes);

const offerRoutes = require("./src/routes/offerRoutes");
app.use("/offer", offerRoutes);

// Test Drive Reminder Worker
const { startTestDriveReminderWorker } = require("./src/controller/TestDriveController");

// Default Route
app.get("/", (req, res) => {
  res.send("Car Scout Backend API Running...");
});

// PORT
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  startTestDriveReminderWorker();
  console.log(`Server is running on port ${PORT}`);
});