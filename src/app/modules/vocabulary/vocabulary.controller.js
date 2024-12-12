const { vocabularyServices } = require("./vocabulary.service");




const vocabularyAdd = async (req, res, next) => {
    try {
        const vocabulary = req.body;
        const result = await vocabularyServices.vocabularyAddToDB(vocabulary)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Vocabulary added  successfull',
                data: result
            })
        }
    } catch (error) {
        next(error)
    }
}
const vocabularyUpdate = async (req, res, next) => {
    try {
        const { vocId } = req.params;
        const updatedData = req.body;

        const updatedVocabulary = await vocabularyServices.vocabularyUpdateToDb(vocId, updatedData)

        res.status(200).json({
            success: true,
            message: "Vocabulary updated successfully",
            data: updatedVocabulary,
        });
    } catch (error) {
        next(error);
    }
};

const getAllVocabulary = async (req, res, next) => {
    try {
        const result = await vocabularyServices.getAllVocabularyFromDb();
        res.status(200).json({
            success: true,
            message: "Vocabulary retrive successfully",
            data: result,
        });

    } catch (error) {
        next(error)
    }
}
const getVocabularyByLessonId = async (req, res, next) => {
    try {
        const { lessonNo } = req.params;
        const result = await vocabularyServices.getVocabularyByLessonIdFromDb(lessonNo);
        res.status(200).json({
            success: true,
            message: "Vocabulary retrive successfully",
            data: result,
        });

    } catch (error) {
        next(error)
    }
}

const deleteVocabulary = async (req, res, next) => {
    try {
        const { vocId } = req.params;
        const result = await vocabularyServices.deleteVocabularyFromDb(vocId);
        res.status(200).json({
            success: true,
            message: "Vocabulary delted successfully",
            data: result,
        });

    } catch (error) {
        next(error)
    }
}




module.exports = {
    vocabularyControllers: {
        vocabularyAdd,
        vocabularyUpdate,
        getAllVocabulary,
        deleteVocabulary,
        getVocabularyByLessonId
    }
}