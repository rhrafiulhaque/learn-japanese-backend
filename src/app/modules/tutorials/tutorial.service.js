const AppError = require("../../../utils/AppError")
const Tutorial = require("./tutorial.model")




const tutorialAddToDb = async (tutorial) => {
    const tutorialExist = await Tutorial.findOne({ tutorialTitle: tutorial.tutorialTitle })
    if (tutorialExist) {
        throw new AppError(501, "Tutorial Already Exist")
    } else {
        const result = await Tutorial.create(tutorial)
        if (!result) {
            throw new AppError(501, "Tutorial added failed")
        }
        return result
    }
}
const tutorialUpdateToDb = async (tutorialId, updatedData) => {
    const { tutorialTitle, tutorialLink } = updatedData;
    if (!tutorialTitle?.trim() && !tutorialLink) {
        throw new AppError(400, "Either tutorial title or tutorial link  must be provided for update");
    }
    // Has the Lesson Id or not 
    const tutorialExist = await Tutorial.findOne({ _id: tutorialId })
    if (!tutorialExist) {
        throw new AppError(400, "Tutorial Not Found")
    }


    const updatedTutorial = await Tutorial.findByIdAndUpdate(
        { _id: tutorialId },
        { tutorialTitle: tutorialTitle?.trim(), tutorialLink },
        { new: true, runValidators: true }
    );
    if (!updatedTutorial) {
        throw new AppError(404, "Tutorial not found");
    }
    return updatedTutorial

}


const getAllTutorialsFromDb = async () => {
    const tutorials = await Tutorial.find()

    if (tutorials.length === 0) {
        throw new AppError(404, 'No tutorials found');
    }
    return tutorials

}

const deleteTutorialFromDb = async (tutorialId) => {
    const tutorialExist = await Tutorial.findOne({ _id: tutorialId });
    if (!tutorialExist) {
        throw new AppError(404, "Tutorial not found");
    }

    const deletedTutorial = await Tutorial.findByIdAndDelete(tutorialId);
    if (!deletedTutorial) {
        throw new AppError(500, "Failed to delete the tutorial");
    }

    return deletedTutorial;
};


module.exports = {
    tutorialServices: {
        tutorialAddToDb,
        tutorialUpdateToDb,
        getAllTutorialsFromDb,
        deleteTutorialFromDb,

    }
}
