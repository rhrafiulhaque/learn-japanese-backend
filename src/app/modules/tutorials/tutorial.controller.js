const { tutorialServices } = require("./tutorial.service");


const tutorialAdd = async (req, res, next) => {
    try {
        const tutorial = req.body;
        const result = await tutorialServices.tutorialAddToDb(tutorial)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Tutorial added  successfull',
                data: result
            })
        }
    } catch (error) {
        next(error)
    }
}
const tutorialUpdate = async (req, res, next) => {
    try {
        const { tutorialId } = req.params;
        const updatedData = req.body;

        const updatedTutorial = await tutorialServices.tutorialUpdateToDb(tutorialId, updatedData);

        res.status(200).json({
            success: true,
            message: "Tutorial updated successfully",
            data: updatedTutorial,
        });
    } catch (error) {
        next(error);
    }
};

const getAllTutorial = async (req, res, next) => {
    try {
        const result = await tutorialServices.getAllTutorialsFromDb();
        res.status(200).json({
            success: true,
            message: "Tutorial retrive successfully",
            data: result,
        });

    } catch (error) {
        next(error)
    }
}
const deleteTutorial = async (req, res, next) => {
    try {
        const { tutorialId } = req.params;
        const result = await tutorialServices.deleteTutorialFromDb(tutorialId);
        res.status(200).json({
            success: true,
            message: "Tutorial deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error)
    }
}




module.exports = {
    tutorialControllers: {
        tutorialAdd,
        tutorialUpdate,
        getAllTutorial,
        deleteTutorial,
    }
}