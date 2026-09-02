const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a buffer to Cloudinary using upload_stream.
 * 
 * @param {Buffer} fileBuffer - File buffer from Multer memoryStorage
 * @param {string} folder - Folder name in Cloudinary
 * @returns {Promise<Object>} - Promise resolving to Cloudinary upload result object
 */
const uploadToCloudinary = (fileBuffer, folder = 'quran_academy') => {
  return new Promise((resolve, reject) => {
    // If Cloudinary credentials are not configured, throw a clear error or handle mock
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return reject(new Error('Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing.'));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
};
