import User from "../Models/users.model.js";
import bcrypt from "bcrypt";
import { setToken } from "../Utils/usersToken.utils.js";
import ErrorHandler from "../middlewares/error.middleware.js";

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: "Retrived Users",
            users,
        });
    } catch (error) {
        next(error);
    }
};

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            // return res.status(404).json({
            //     success: false,
            //     message: "User already exists",
            // });
            throw new ErrorHandler("User already exists", 400);
        }
        const hashedPass = await bcrypt.hash(password, 10);
        user = await User.create({ username, email, password: hashedPass });
        setToken(user, res, 201, "User registered successfully");
    } catch (error) {
        next(error);
    }
};
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            // return res.status(404).json({
            //     success: false,
            //     message: "User does not exist, Please register",
            // });
            // if using return then call next with passing error in it
            return next(
                new ErrorHandler("User does not exist, Please register", 400)
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // return res.status(404).json({
            //     success: false,
            //     message: "Invalid credentials",
            // });
            // if using throw just call the error handler, the next in catch block automatically starts executing
            throw new ErrorHandler("Invalid credentials", 400);
        }
        setToken(
            user,
            res,
            200,
            `User logged in successfully, Welcome Back ${user.username}`
        );
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Your profile details",
        user,
    });
};

export const logoutUser = (req, res) => {
    // res.clearCookie('token', {
    //     httpOnly: true,
    //     sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    //     secure: process.env.NODE_ENV !== "development",
    // });
    // or
    res.cookie("token", "", {
        expire: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "development",
    });
    // or });
    res.status(200).json({
        success: true,
        message: "User logged out successfully",
        user: req.user,
    });
};

export const updateMyDetails = () => {};
export const deleteAccount = () => {};
