import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import session from "express-session";
import passport from "passport";
import "./configs/passport.js";
import connectDB from "./configs/db.js"
import userRoutes from "./routes/user.route.js"
import sellerRoutes from "./routes/seller.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import orderRoutes from "./routes/order.route.js"
import addressRoutes from "./routes/address.route.js"
import { stripeWebhooks } from "./controllers/order.controller.js";
dotenv.config() 
const app = express()
const allowedOrigins = [
  'https://project1-tan-five.vercel.app',
  'http://localhost:5173'
];
const PORT = process.env.PORT || 4000
app.post("/stripewebhook", express.raw({ type: 'application/json' }), stripeWebhooks)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax"
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.send("ok")
})

app.use("/api/user", userRoutes)
app.use("/api/seller", sellerRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/address", addressRoutes)
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on ${PORT}`);
    });
}).catch((err) => {
    console.error("❌ Connetion error:", err);
});
