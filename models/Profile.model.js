const profileSchema = new Schema(
  {
    avatar: {
      type: String,
      default: String,
    },
    surfMantra: {
      type: String,
    },
    tallestWave: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
