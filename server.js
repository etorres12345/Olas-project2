const { default: mongoose } = require("mongoose");
const app = require("./app");

require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const User = require("./models/User.model");
// const Profile = require("./models/Profile.model");
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log(
//         `Connected to DB & Server listening on port', process.env.PORT`
//       );
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listneing on port :${PORT}`);
  });
});
