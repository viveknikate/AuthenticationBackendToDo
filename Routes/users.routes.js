import { Router } from "express";
import {
    deleteAccount,
    getAllUser,
    getMyProfile,
    loginUser,
    logoutUser,
    registerUser,
    updateMyDetails,
} from "../Controller/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/all", getAllUser);
router.post("/register", registerUser);
router.get("/logout", isAuthenticated, logoutUser);
router.post("/login", loginUser);

// multiple request on same route, but different methods get, post, put, delete
router
    .route("/me")
    .all(isAuthenticated)           // applies for all methods GET, PUT, DELETE
    .get(getMyProfile)
    .put(updateMyDetails)
    .delete(deleteAccount);

//  if want to apply for specific methods. just for put & delete then
// before accessing the put & delete request it will ensure that they are authenticated
// router
//     .route("/me")
//     .get(getMyProfile)
//     .put(isAuthenticated, updateMyDetails)
//     .delete(isAuthenticated, deleteAccount);

export default router;
