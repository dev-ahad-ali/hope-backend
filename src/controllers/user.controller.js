import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  // get user information from frontend ✅
  // validation - not empty ✅
  // check if user already exist : email, username ✅
  // check for image : avatar check ✅
  // upload them to cloudinary : avatar check ✅
  // create user object - create entry in Db ✅
  // check for user creation ✅
  // remove password and refresh token filed from response ✅
  // return response ✅

  const { fullName, userName, email, password } = req.body;
  console.log('body data', req.body);

  if ([fullName, userName, email, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'All fields are required');
  }

  const userAlreadyExist = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (userAlreadyExist) throw new ApiError(409, 'User with email or username already exist');

  console.log('multer files', req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path; // console log the "req.files" to see all the info
  // const coverLocalPath = req.files?.cover[0]?.path;
  let coverLocalPath;
  if (req.files && Array.isArray(req.files.cover) && req.files.cover.length > 0) {
    coverLocalPath = req.files.cover[0].path;
  }

  if (!avatarLocalPath) throw new ApiError(400, 'Avatar file is required');

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const cover = await uploadOnCloudinary(coverLocalPath);

  if (!avatar) throw new ApiError(400, 'Avatar file id required');

  const user = await User.create({
    fullName,
    userName: userName.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: cover?.url || '',
    email,
  });

  const createdUser = await User.findById(user._id).select('-password -refreshToken'); // ".select method selects all the fields by default, by passing '-filedName' you can deselect the fields"

  if (!createdUser) throw new ApiError(500, 'Something went wrong while registering user');

  return res.status(201).json(new ApiResponse(200, createdUser, 'User created successfully'));
});

export { registerUser };
