const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'drcjzvyb3',
    api_key: '882812884218939',
    api_secret: 'NIWj9fAtq4FLHLun8cCZfY4H1PA',
});

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return reject(error);
                }
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    });
};
module.exports = uploadToCloudinary;
