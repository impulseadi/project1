import jwt from "jsonwebtoken"
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (
            email === process.env.SELLER_EMAIL &&
            password === process.env.SELLER_PASSWORD
        ) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            })

            res.cookie("sellerToken", token, {
                httpOnly: true,
                message:"sssssssss",
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, 
            })

                        console.log("token banaya hai=",token)
                            // const { sellerToken } = res.cookie
                                                    // console.log("token banaya hai2=",sellerToken)




            return res.json({ success: true, message: "Seller logged in" })
        }

        return res
            .status(401)
            .json({ success: false, message: "Invalid credentials" })
    } catch (error) {
        console.error("Seller login error:", error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export const isASellerAuth = async (req, res) => {
    try {
        
     return res.status(200).json({ message:"wao",success: true })
    } catch (error) {
        console.error("Seller auth check error:", error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })

        return res.json({ success: true, message: "Logged out" })
    } catch (error) {
        console.error("Seller logout error:", error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}
