import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const registerUser = asyncHandler(async (req, res) => {
  // get user information from frontend ✅
  // validation - not empty ✅
  // check if user already exist : email, username
  // check for image : avatar check
  // upload them to cloudinary : avatar check
  // create user object - create entry in Db
  // remove password and refresh token filed from response
  // check for user creation
  // return response

  const { userName, email, password } = req.body;
  console.log('email:', email);

  if ([userName, email, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'All fields are required');
  }
});

export { registerUser };
