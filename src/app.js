const cors = require('cors')
const express = require('express');
const globalErrorHandler = require('./app/middlewares/globalErrorHandler');
const router = require('./app/routes');
const app = express();
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', router)

app.use(globalErrorHandler)


module.exports = app
