
const jwt = require('jsonwebtoken')
const config = require('../config')
const AppError = require('../../utils/AppError')


const verifyAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return next(new AppError(401, 'Please login to access this resource'))
    }

    try {
        const decoded = jwt.verify(token, config.jwt.accessTokenSecret)

        req.user = decoded
        next()
    } catch (err) {
        return next(new AppError(401, 'Invalid or expired token'))
    }
}

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new AppError(401, 'Admin access required'))
    }
    next()
}

const optionalAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (token) {
            const decoded = jwt.verify(token, config.jwt.accessTokenSecret)
            req.user = decoded
        }
        next()
    } catch (error) {
        // If token is invalid, just continue without user
        next()
    }
}

module.exports = {
    verifyAuth,
    verifyAdmin,
    optionalAuth,
}
