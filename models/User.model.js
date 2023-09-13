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
    avatar: {
      type: String,
      default: '/images/logo-green-login.png'
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
