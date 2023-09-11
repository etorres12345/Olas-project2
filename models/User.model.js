const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true,
      min: 5,
    },
    avatarUrl: {
      type: String,
      default: '../public/images/default-avatar.png'
    },
    posts: [
      { type: Schema.Types.ObjectId, ref: 'Post' }
    ],
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
