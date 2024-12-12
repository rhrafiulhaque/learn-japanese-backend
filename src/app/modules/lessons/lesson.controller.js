const { lessonServices } = require("./lesson.service");


const lessonAdd = async (req, res, next) => {
    try {
        const lesson = req.body;
        const result = await lessonServices.lessonAddToDb(lesson)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Lesson added  successfull',
                data: result
            })
        }
    } catch (error) {
        next(error)
    }
}
const lessonUpdate = async (req, res, next) => {
    try {
        const { lessonId } = req.params;
        const updatedData = req.body;

        const updatedLesson = await lessonServices.lessonUpdateToDb(lessonId, updatedData);

        res.status(200).json({
            success: true,
            message: "Lesson updated successfully",
            data: updatedLesson,
        });
    } catch (error) {
        next(error);
    }
};

const getAllLesson = async (req, res, next) => {
    try {
        const result = await lessonServices.getAllLessonsFromDb();
        res.status(200).json({
            success: true,
            message: "Lesson retrive successfully",
            data: result,
        });

    } catch (error) {
        next(error)
    }
}
const deleteLesson = async (req, res, next) => {
    try {
        const { lessonId } = req.params;
        const result = await lessonServices.deleteLessonFromDb(lessonId);
        res.status(200).json({
            success: true,
            message: "Lesson deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error)
    }
}




module.exports = {
    lessonControllers: {
        lessonAdd,
        lessonUpdate,
        getAllLesson,
        deleteLesson
    }
}