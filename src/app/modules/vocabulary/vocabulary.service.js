const AppError = require("../../../utils/AppError")
const Vocabulary = require("./vocabulary.model")



const vocabularyAddToDB = async (vocabulary) => {
    const vocabularyExist = await Vocabulary.findOne({ word: vocabulary.word })
    if (vocabularyExist) {
        throw new AppError(501, "Vocabulary Already Exist")
    } else {
        const result = await Vocabulary.create(vocabulary)
        if (!result) {
            throw new AppError(501, "Vocabulary added failed")
        }
        return result
    }
}
const vocabularyUpdateToDb = async (vocId, updatedData) => {

    const vocabulary = await Vocabulary.findOne({ _id: vocId })
    if (!vocabulary) {
        throw new AppError(400, "Vocabulary Not Found")
    }

    Object.keys(updatedData).forEach((key) => {
        if (updatedData[key]) {
            vocabulary[key] = updatedData[key];
        }
    });

    await vocabulary.save();


    return vocabulary


}

const deleteVocabularyFromDb = async (vocId) => {
    const vocabulary = await Vocabulary.findOne({ _id: vocId });
    if (!vocabulary) {
        throw new AppError(400, "Vocabulary Not Found");
    }

    const deletedVocabulary = await Vocabulary.findByIdAndDelete(vocId);
    if (!deletedVocabulary) {
        throw new AppError(500, "Failed to delete the vocabulary");
    }

    return deletedVocabulary;
}


const getAllVocabularyFromDb = async () => {
    const vocabulary = await Vocabulary.find()

    if (vocabulary.length === 0) {
        throw new AppError(404, 'No vocabulary found');
    }
    return vocabulary

}
const getVocabularyByLessonIdFromDb = async (lessonNo) => {
    const vocabulary = await Vocabulary.find({ lessonNumber: lessonNo })

    if (vocabulary.length === 0) {
        throw new AppError(404, 'No vocabulary found');
    }
    return vocabulary

}


module.exports = {
    vocabularyServices: {
        vocabularyAddToDB,
        vocabularyUpdateToDb,
        getAllVocabularyFromDb,
        deleteVocabularyFromDb,
        getVocabularyByLessonIdFromDb

    }
}
