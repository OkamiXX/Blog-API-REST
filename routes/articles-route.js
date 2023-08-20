// Imports the router method from express.js.
const router = require('express').Router();
// Imports the articles-controller to use for the routes.
const ArticlesController = require('../controllers/articles-controller');
// Imports the multer package to handle the image uploads.
const multer = require('multer');

// Sets the storage for the images.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/img/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, 'post' + '-' + file.originalname);
    }
});

// Sets the upload variable to use the storage.
const upload = multer({ storage: storage });

// Set default API response for the article routes.
router.post('/create', ArticlesController.addArticle)
router.get('/articles/:last?', ArticlesController.getAllArticles);
router.get('/article/:id', ArticlesController.getArticle);
router.delete('/article/:id', ArticlesController.deleteArticle);
router.put('/article/:id', ArticlesController.updateArticle);
router.post('/upload-image/:id', [upload.single('file')],  ArticlesController.uploadImage);
router.get('/get-image/:img', ArticlesController.getImage);
router.get('/search/:search', ArticlesController.searchArticles);

// Exports the routes
module.exports = router;