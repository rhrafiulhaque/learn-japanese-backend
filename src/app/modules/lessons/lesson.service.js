const AppError = require("../../../utils/AppError")
const Lesson = require("./lessons.model")



const lessonAddToDb = async (lesson) => {
    const lessonExist = await Lesson.findOne({ lessonName: lesson.lessonName })
    if (lessonExist) {
        throw new AppError(501, "Lesson Already Exist")
    } else {
        const result = await Lesson.create(lesson)
        if (!result) {
            throw new AppError(501, "Lesson added failed")
        }
        return result
    }
}
const lessonUpdateToDb = async (lessonId, updatedData) => {
    const { lessonName, lessonNumber } = updatedData;
    if (!lessonName?.trim() && !lessonNumber) {
        throw new AppError(400, "Either lesson name or lesson number must be provided for update");
    }
    // Has the Lesson Id or not 
    const lessonExist = await Lesson.findOne({ _id: lessonId })
    if (!lessonExist) {
        throw new AppError(400, "Lesson Not Found")
    }

    // cheking duplicate lessonName
    if (lessonName) {
        const existingLesson = await Lesson.findOne({
            lessonName: lessonName.trim(),
            _id: { $ne: lessonId },
        });
        if (existingLesson) {
            throw new AppError(400, "Lesson name already exists");
        }
    }
    // cheking duplicate lessonNumber
    if (lessonNumber) {
        const existingLesson = await Lesson.findOne({
            lessonNumber: lessonNumber,
            _id: { $ne: lessonId },
        });
        if (existingLesson) {
            throw new AppError(400, "Lesson number already exists");
        }
    }

    // after cheking all in lesson number and lesson name is not exist then updating the data 

    const updatedLesson = await Lesson.findByIdAndUpdate(
        { _id: lessonId },
        { lessonName: lessonName?.trim(), lessonNumber },
        { new: true, runValidators: true }
    );
    if (!updatedLesson) {
        throw new AppError(404, "Lesson not found");
    }



    return updatedLesson

}


const getAllLessonsFromDb = async () => {
    const lessons = await Lesson.find()

    if (lessons.length === 0) {
        throw new AppError(404, 'No lessons found');
    }
    return lessons

}

const deleteLessonFromDb = async (lessonId) => {
    const lessonExist = await Lesson.findOne({ _id: lessonId });
    if (!lessonExist) {
        throw new AppError(404, "Lesson not found");
    }

    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);
    if (!deletedLesson) {
        throw new AppError(500, "Failed to delete the lesson");
    }

    return deletedLesson;
};


module.exports = {
    lessonServices: {
        lessonAddToDb,
        lessonUpdateToDb,
        getAllLessonsFromDb,
        deleteLessonFromDb

    }
}
