import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      require: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      require: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    password: {
      type: String,
      require: [true, 'Password is Required'],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
