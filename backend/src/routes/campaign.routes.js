import { Router } from "express";
import {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
} from "../controllers/campaign.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Routes
router.post("/", verifyJWT, upload.single("image"), createCampaign); // create campaign with optional image
router.get("/", getAllCampaigns);
router.get("/:id", getCampaignById);
router.put("/:id", verifyJWT, upload.single("image"), updateCampaign); // update campaign image if provided
router.delete("/:id", verifyJWT, deleteCampaign);

export default router;
