import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Campaign from '../models/campaign.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// ✅ Create new campaign
const createCampaign = asyncHandler(async (req, res) => {
    if (req.user.role !== "ngo") throw new ApiError(403, "Only NGOs can create campaigns");

    const { title, description, targetAmount, category } = req.body;

    if (!title || !description || !targetAmount) {
        throw new ApiError(400, "Title, description, and targetAmount are required");
    }

    // Upload image if exists
    let imageUrl = "";
    if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        imageUrl = uploadResult?.secure_url || "";
    }

    const campaign = await Campaign.create({
        title,
        description,
        targetAmount,
        category,
        image: imageUrl,
        createdBy: req.user._id,
    });

    res.status(201).json(new ApiResponse(201, campaign, "Campaign created successfully"));
});

// ✅ Get all campaigns
const getAllCampaigns = asyncHandler(async (req, res) => {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, campaigns, "Campaigns fetched successfully"));
});

// ✅ Get campaign by ID
const getCampaignById = asyncHandler(async (req, res) => {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) throw new ApiError(404, "Campaign not found");
    res.status(200).json(new ApiResponse(200, campaign, "Campaign fetched successfully"));
});

// ✅ Update campaign
const updateCampaign = asyncHandler(async (req, res) => {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) throw new ApiError(404, "Campaign not found");
    if (req.user.role !== "ngo") throw new ApiError(403, "Only NGOs can update campaigns");

    const { title, description, targetAmount, category, status } = req.body;

    campaign.title = title || campaign.title;
    campaign.description = description || campaign.description;
    campaign.targetAmount = targetAmount || campaign.targetAmount;
    campaign.category = category || campaign.category;
    campaign.status = status || campaign.status;

    // Update image if file uploaded
    if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        campaign.image = uploadResult?.secure_url || campaign.image;
    }

    await campaign.save();
    res.status(200).json(new ApiResponse(200, campaign, "Campaign updated successfully"));
});

// ✅ Delete campaign
const deleteCampaign = asyncHandler(async (req, res) => {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) throw new ApiError(404, "Campaign not found");
    if (req.user.role !== "ngo") throw new ApiError(403, "Only NGOs can delete campaigns");

    await campaign.deleteOne();
    res.status(200).json(new ApiResponse(200, null, "Campaign deleted successfully"));
});

export { createCampaign, getAllCampaigns, getCampaignById, updateCampaign, deleteCampaign };
