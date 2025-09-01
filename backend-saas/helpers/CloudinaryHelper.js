require("dotenv").config();
const cloudinary = require("../config/cloudinary");

/**
 * Dosyayı Cloudinary'ye yükler
 * @param {Buffer} fileBuffer - Dosya buffer'ı
 * @param {string} folder - Cloudinary klasör adı
 * @returns {Promise<Object>} - Yükleme sonucu
 */
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(fileBuffer);
  });
};

/**
 * Cloudinary'den dosya siler
 * @param {string} url - Silinecek görselin URL'si
 * @returns {Promise<Object>}
 */
const deleteFromCloudinary = async (url) => {
  const publicId = url.split("/").pop().split(".")[0];
  return cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };