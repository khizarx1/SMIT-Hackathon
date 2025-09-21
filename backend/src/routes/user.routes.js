import { Router } from "express";
import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/me", verifyJWT, getCurrentUser);

export default router;
