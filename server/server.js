import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./configs/passport.js";
import connectDB from "./configs/db.js";
import userRoutes from "./routes/user.route.js";
import sellerRoutes from "./routes/seller.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";
import addressRoutes from "./routes/address.route.js";
import { stripeWebhooks } from "./controllers/order.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = ['https://project1-three-amber.vercel.app'];

// Stripe raw body parser (must come before express.json)
app.post("/stripewebhook", express.raw({ type: 'application/json' }), stripeWebhooks);

// Standard middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ CORS configuration
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Preflight requests support
app.options('*', cors({
    origin: allowedOrigins,
    credentials: true
}));

// ✅ Correct session config for cross-origin
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV !== "development",
        sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax"
    }
}));

// Auth
app.use(passport.initialize());
app.use(passport.session());

// Health check route
app.get("/", (req, res) => {
    res.send("ok");
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);

// Connect DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on ${PORT}`);
    });
}).catch((err) => {
    console.error("❌ Connection error:", err);
});
