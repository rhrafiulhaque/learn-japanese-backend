const express = require('express');

const UserRouter = require('../modules/users/users.route');
const { LessonRouter } = require('../modules/lessons/lessons.route');
const { VocabularyRouter } = require('../modules/vocabulary/vocabulary.route');
const router = express.Router()

const moduleRoutes = [
    {
        path: '/user',
        route: UserRouter,
    },
    {
        path: '/lesson',
        route: LessonRouter,
    },
    {
        path: '/vocabulary',
        route: VocabularyRouter,
    },
]
moduleRoutes.forEach(route => router.use(route.path, route.route))

module.exports = router
