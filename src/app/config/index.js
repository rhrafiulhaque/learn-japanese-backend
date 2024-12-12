const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.join(process.cwd(), '.env') })

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bycrpt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        accessTokenSecret: process.env.JWT_ACCESS_SECRET,
        refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
        accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
        refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
    },
}
