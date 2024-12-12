const AppError = require("../../../utils/AppError")
const { generateTokens } = require("../../../utils/jwt")
const isEmptyString = require("../../../utils/utils")
const User = require("./users.model")
const bcrypt = require("bcrypt")

const registerUserToDb = async (user) => {
    const userExist = await User.findOne({ email: user.email })
    if (userExist) {
        throw new AppError(501, "User Email Already Exist")
    } else {
        const result = await User.create(user)
        if (!result) {
            throw new AppError(501, "User registered failed")
        }
        return result
    }
}
const userRoleUpdateToDb = async (userId, updatedData) => {
    const { role } = updatedData

    const user = await User.findOne({ _id: userId })
    if (!user) {
        throw new AppError(400, "User Not Found")
    }

    const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { role: role },
        { new: true, runValidators: true }
    );
    if (!updatedUser) {
        throw new AppError(404, "Lesson not found");
    }

    return updatedUser

}


const userLoginFromDb = async (payload) => {

    const email = payload.email;
    const password = payload.password;
    if (isEmptyString(email) || isEmptyString(password)) {
        throw new AppError(400, "Email and password are required and cannot be empty");
    }

    const user = await User.findOne({ email: email }).exec();
    if (!user) {
        throw new AppError(401, "Invalid Email")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new AppError(401, "Invalid password")
    }

    const tokens = generateTokens(user)
    const updateResult = await User.findByIdAndUpdate(
        user._id,
        { refreshToken: tokens.refreshToken },
        { new: true }
    );

    if (!updateResult) {
        throw new AppError(500, "Failed to update refresh token");
    }

    const { password: _, ...userWithoutPassword } = user.toJSON()


    return {
        user: userWithoutPassword,
        tokens
    }
}

const getAllUsersFromDb = async () => {
    const result = await User.find();
    if (result.length === 0) {
        throw new AppError(404, 'No Users found');
    }
    return result

}

const refreshToken = async (token) => {
    const user = await User.findOne({ refreshToken: token });
    if (!user) {
        throw new AppError(401, 'Invalid refresh token')
    }
    const tokens = generateTokens(user)
    await User.updateOne({ _id: user._id }, { refreshToken: tokens.refreshToken });
    return tokens
}


module.exports = {
    userServices: {
        registerUserToDb,
        userLoginFromDb,
        refreshToken,
        userRoleUpdateToDb,
        getAllUsersFromDb

    }
}
