const jwt = require('jsonwebtoken')
const config = require('../app/config')

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        config.jwt.accessTokenSecret,
        { expiresIn: config.jwt.accessTokenExpiry }
    )

    const refreshToken = jwt.sign(
        { id: user._id },
        config.jwt.refreshTokenSecret,
        { expiresIn: config.jwt.refreshTokenExpiry }
    )

    return { accessToken, refreshToken }
}

module.exports = {
    generateTokens,
}
