// Imports the router method from express.js.
const router = require('express').Router();
// Imports the articles-controller to use for the routes.
const ArticlesController = require('../controllers/articles-controller');

router.get('/test', ArticlesController.test);

router.post('/create', ArticlesController.create)

// Exports the routes
module.exports = router;