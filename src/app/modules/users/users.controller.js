const uploadToCloudinary = require("../../../utils/cloudinary");
const { userServices } = require("./users.service");

const registerUser = async (req, res, next) => {
    try {
        const user = req.body;
        let profilePhotoUrl = null;


        if (req.file) {
            try {
                const uploadResult = await uploadToCloudinary(req.file.buffer);
                profilePhotoUrl = uploadResult.secure_url;

            } catch (error) {
                console.error("Error uploading to Cloudinary:", error);
                throw new Error("Failed to upload photo to Cloudinary");
            }
        }

        user.profilePhoto = profilePhotoUrl;



        const result = await userServices.registerUserToDb(user)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User register successfull',
                data: result
            })
        }
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const payload = req.body;
        const result = await userServices.userLoginFromDb(payload)
        res.status(200).json({
            success: true,
            message: "User login successfull",
            data: result
        })
    } catch (error) {
        next(error)
    }
}
const getAllUsers = async (req, res, next) => {
    try {
        const result = await userServices.getAllUsersFromDb()
        res.status(200).json({
            success: true,
            message: "All User Retrive successfull",
            data: result
        })
    } catch (error) {
        next(error)
    }
}
const updateUserRole = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        const updatedUser = await userServices.userRoleUpdateToDb(userId, updatedData)
        res.status(200).json({
            success: true,
            message: "User Role Update successfull",
            data: updatedUser
        })
    } catch (error) {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const tokens = await userServices.refreshToken(req.body.refreshToken)
        res.status(200).json({
            success: true,
            message: "Refresh Token Generate Successfull",
            data: tokens
        })

    } catch (error) {
        next(error)

    }
}

module.exports = {
    usersControllers: {
        registerUser,
        loginUser,
        refreshToken,
        updateUserRole,
        getAllUsers
    }
}