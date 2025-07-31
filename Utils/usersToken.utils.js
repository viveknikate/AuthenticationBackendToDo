import jwt from 'jsonwebtoken'
export const setToken = (user, res, statusCode, message) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    
    res.status(statusCode).cookie('token', token, {
        httpOnly: true,
        // maxAge: 1000 * 60 * 5,             // 5 min
        maxAge: 1000 * 60 * 10,             // 10 min
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        // secure: process.env.NODE_ENV === "development" ? false : true,
        // cleaner version below
        secure: process.env.NODE_ENV !== "development",
    }).json({
        success: true,
        message
    })
}