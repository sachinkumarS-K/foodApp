import ApiError from "../utils/ApiError.js";
import APiResponse from "../utils/ApiResponse.js";
import { User } from "../models/userModel.js";

const options = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();
        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
    }
};

const registerUser = async(req, res, next) => {
    const { userName, email, password } = req.body;
    console.log(req.body)
    if (!userName || !email || !password) {
        return next(new ApiError(400, "All fields are required"));
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        return next(new ApiError(400, "User already exist"));
    }

    const user = await User.create({
        userName,
        email,
        img: `https://api.dicebear.com/5.x/initials/svg?seed=${userName}kumar`,
        password,
    });
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const createdUser = await User.findById(user._id).select(
        "-password "
    );
    if (!createdUser) {
        return next(
            new ApiError(400, "something went wrong while registering the user")
        );
    }


    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refeshToken", refreshToken, options)
        .json(new APiResponse(200, createdUser, "User created successfully"));
};
const loginUser = async(req, res,next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ApiError(404, "All fields are required"));
        }
        const user = await User.findOne({ email });
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return next(new ApiError(400 , "Password not matched try again !!"))
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        return res
          .cookie("accessToken", accessToken, options)
          .cookie("refeshToken", refreshToken, options)
          .status(201)
          .json(new APiResponse(200, user, "User logged in successfully"));


    } catch (error) {
        console.log(error)
        return next(new ApiError(404, "Error while longing in user"));
    }
};

export { registerUser, loginUser };