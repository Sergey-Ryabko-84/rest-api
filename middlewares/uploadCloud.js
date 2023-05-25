const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configuration
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: "avatars",
      allowedFormats: ["jpg", "png"],
      public_id: `${file.originalname.slice(0, -4)}_${Date.now()}`,
      transformation: [
        { height: 200, width: 200, crop: "fill" },
      ],
    };
  },
});

const uploadCloud = multer({ storage });

module.exports = { uploadCloud };
