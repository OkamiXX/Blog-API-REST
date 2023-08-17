// -------------------------------------------------
const test = (req, res) => {
    return res.status(200).json({
        message: 'Test for the Articles controller'
    });
};


const create = (req, res) => {

    // Get parameters form the users POST.

    // VALIDATE

    // Create object on save

    // Assign values to the model

    // Save article to database

    // Return result

    return res.status(200).json({
        message: 'CREATE ACTION'
    });
};



module.exports = {
    test,
    create
};