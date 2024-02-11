const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "djifpwwiy",
  api_key: "819215326638416",
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;
