// ------------------------------------------------- 
// IMPORTS
const Articles = require('../models/Articles');
const { validate } = require('../helpers/validate');
const path = require('path');
const fs = require('fs');


// -------------------------------------------------
// Add article
const addArticle = (req, res) => {

    // Get parameters form the users POST.
    let parameters = req.body;

    // Get the last parameter from the URL.
    let query = req.params.last;

    try {
        // VALIDATE
        validate(parameters);
    } catch (err) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'ERROR: Error creating article'
        })
    }

    // Create object to save
    const article = new Articles(parameters); // -> Same purpose as the code below. (assigns the values to the model automatically)

    // Assign values to the model
    // article.title = parameters.title;

    // Save article to database
    article.save()
        .then(savedArticle => {
            // Return result
            return res.status(200).json({
                status: 'SUCCESS',
                article: savedArticle,
                message: 'Article saved successfully'
            });
        })
        .catch(err => {
            // If there is an error or not article information then return error.
            if (err || !savedArticle) {
                return res.status(500).json({
                    status: 'ERROR',
                    message: 'ERROR: Article not saved',
                    err
                });
            }
        });

};

// -------------------------------------------------
// Get all articles
const getAllArticles = (req, res) => {
    // Get all articles from the DB
    let query = Articles.find({}).sort({ date: -1 }) // 'desc' -> descending order || 'asc' -> ascending order // Sorts the articles by date.

    // If the last parameter is not undefined then limit the query to 3 articles.
    if (req.params.last) { query = query.limit(3) }

    // If the query is successful then return the articles.
    query.then(articles => {
        return res.status(200).json({
            status: 'SUCCESS',
            count: articles.length,
            articles
        });
    })
        // If the query is not successful then return an error.
        .catch(err => {
            return res.status(404).json({
                status: 'ERROR',
                message: 'ERROR: Articles not found',
                err
            });
        });
};

// -------------------------------------------------
// Get single article
const getArticle = async (req, res) => {

    // Get the article ID from the URL.
    let id = req.params.id;

    // Validate the ID.
    try {
        // Search the article by ID.
        let query = await Articles.findById(id)


            // If the query is successful then return the article.
            .then(article => {
                return res.status(200).json({
                    status: 'SUCCESS',
                    article
                });
            });



    } catch (err) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'ERROR: Invalid ID'
        })
    }
};

// -------------------------------------------------
// Delete article
const deleteArticle = async (req, res) => {
    try {
        let id = req.params.id;

        let article = await Articles.findOneAndDelete({ _id: id });



        return res.status(200).json({
            status: 'SUCCESS',
            message: 'Article deleted successfully',
            article: article
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            status: 'ERROR',
            message: 'ERROR: Error deleting article'
        })
    }
};

// -------------------------------------------------
// Update article
const updateArticle = async (req, res) => {

    // Get parameters form the users POST.
    let parameters = req.body;

    try {
        // VALIDATE
        validate(parameters);
    } catch (err) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'ERROR: Error updating article'
        })
    }


    try {
        // Find and update the article.
        let article = await Articles.findOneAndUpdate({ _id: req.params.id }, parameters, { new: true });

        // Return the updated article.
        return res.status(200).json({
            status: 'SUCCESS',
            message: 'Article updated successfully',
            article: article
        })

        // Get the parameters from the body.
    } catch (err) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'ERROR: Error updating article'
        })
    }
};

// -------------------------------------------------
// Upload image
const uploadImage = async (req, res) => {

    // Check if there is a file.
    if (!req.file) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'ERROR: No image uploaded'
        })
    }

    // Get the file name.
    let file_name = req.file.originalname;

    // Get the file extension.
    let file_extension = file_name.split('\.')[1];

    // Check if the file extension is valid.
    if (file_extension != 'png' && file_extension != 'jpg' &&
        file_extension != 'jpeg' && file_extension != 'gif') {

        // If the file extension is not valid then delete the file.
        fs.unlink(req.file.path, (err) => {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ERROR: Invalid file extension'
            })
        });

    } else {

        // Add the image to the article in the DB.
        try {
            // Find and update the article with the new img.
            let article = await Articles.findOneAndUpdate({ _id: req.params.id }, { img: req.file.filename }, { new: true })
            console.log(req.file.filename);
            // Return the updated article.
            return res.status(200).json({
                status: 'SUCCESS',
                message: 'Img file uploaded successfully',
                article: article,
                img: req.file
            })

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                status: 'ERROR',
                message: 'ERROR: Error adding img file to article'
            })
        }
    };
};

// -------------------------------------------------
// Get image by ID
const getImage = async (req, res) => {
    // Get the file name.
    let file = req.params.img;
    // Get the path to the file.
    let file_path = `./assets/img/uploads/${file}`;
    console.log(file_path);

    // Check if the file exists.
    fs.stat(file_path, (err, exists) => {
        // If the file exists then return the file.
        if (exists) {
            return res.sendFile(path.resolve(file_path));
        } else {
            // If the file does not exist then return an error with the request information.
            return res.status(404).json({
                status: 'ERROR',
                message: 'ERROR: File does not exist',
                exists,
                file,
                path
            })
        };
    });
};



module.exports = {
    addArticle,
    getAllArticles,
    getArticle,
    deleteArticle,
    updateArticle,
    uploadImage,
    getImage
};