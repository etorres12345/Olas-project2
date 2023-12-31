const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      min: 2,
      max: 50,
      required: [true, "Title is required."],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      enum: ["sell/rent", "tips", "meetup"],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      max: 100,
    },
    mediaUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
postSchema.index({ description: "text" });

const Post = model("Post", postSchema);

module.exports = Post;
