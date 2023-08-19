// ------------------------------------------------- 
// Import validator
const validator = require('validator');

const validate = (parameters) => {
    // VALIDATE
   
        let validator_title = !validator.isEmpty(parameters.title) && 
        validator.isLength(parameters.title, {min: 5, max: 120});

        let validator_content = !validator.isEmpty(parameters.content);

        if (!validator_title || !validator_content) {
            throw new Error('VALIDATION ERROR: Invalid Data');
        }
};

// Exports the validate function.
module.exports = {validate};