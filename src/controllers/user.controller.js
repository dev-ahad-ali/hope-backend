import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
  // get user information from frontend ✅
  // validation - not empty ✅
  // check if user already exist : email, username ✅
  // check for image : avatar check ✅
  // upload them to cloudinary : avatar check ✅
  // create user object - create entry in Db ✅
  // remove password and refresh token filed from response
  // check for user creation
  // return response

  const { fullName, userName, email, password } = req.body;
  console.log('email:', email);

  if ([fullName, userName, email, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'All fields are required');
  }

  const userAlreadyExist = User.findOne({
    $or: [{ email }, { userName }],
  });

  if (userAlreadyExist) throw new ApiError(409, 'User with email or username already exist');

  const avatarLocalPath = req.files?.avatar[0]?.path; // console log the "req.files" to see all the info
  const coverLocalPath = req.files?.cover[0]?.path;

  if (!avatarLocalPath) throw new ApiError(400, 'Avatar file id required');

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const cover = await uploadOnCloudinary(coverLocalPath);

  if (!avatar) throw new ApiError(400, 'Avatar file id required');

  User.create({
    fullName,
    userName: userName.toLowerCase(),
    password,
    avatar: avatar.url,
    cover: cover?.url || '',
    email,
  });
});

export { registerUser };
