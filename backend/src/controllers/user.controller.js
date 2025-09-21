import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// ✅ Register User
const registerUser = asyncHandler(async (req, res) => {
    // get user from frontend
    const { fullName, email, password, role } = req.body;
    console.log("email", email);

    // validation - not empty
    if ([fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    // validate role
    if (role && !["ngo", "donor"].includes(role)) {
        throw new ApiError(400, "Role must be either 'ngo' or 'donor'");
    }

    // check if user already exist: email
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    // upload profileImage on cloudinary
    let profileImageUrl = "";
    if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file?.path);
        profileImageUrl = uploadResult?.url || "";
    }

    // create user object, create entry in db
    const user = await User.create({
        fullName,
        email,
        password,
        role: role || "donor", // 👈 default donor if not provided
        profileImage: profileImageUrl,
    });

    // generate token
    const token = user.generateAccessToken();

    // remove password from response
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }

    // return response
    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                { user: createdUser, token },
                "User Registered successfully"
            )
        );
});

// ✅ Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Verify password
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Generate token
    const token = user.generateAccessToken();

    // Return user without password
    const loggedInUser = await User.findById(user._id).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(200, { user: loggedInUser, token }, "Login successful")
        );
});

// ✅ Get current logged-in user (req.user from verifyJWT)
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Current user fetched successfully"));
});

export { registerUser, loginUser, getCurrentUser };
