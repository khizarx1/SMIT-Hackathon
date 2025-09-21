// models/campaign.model.js
import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        targetAmount: { type: Number, required: true },
        category: {
            type: String,
            enum: ["education", "health", "environment", "disaster", "poverty"],
            default: "education",
        },
        status: {
            type: String,
            enum: ["active", "completed"],
            default: "active",
        },
        image: { type: String }, // Cloudinary URL
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);
