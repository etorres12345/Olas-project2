const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId, ref: "User"
        },
        title: {
            type: String,
            min: 2,
            max: 50,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ['sell/rent', 'tips', 'meetup']
        },
        description: {
            type: String,
            required: true,
            max: 100
        },
        mediaUrl: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Post = model("Post", postSchema);

module.exports = Post;