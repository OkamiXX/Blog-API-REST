// Initialize express router
const router = require('express').Router();

// Set default API response
const article_routes = require('./articles-route');
router.use('/api', article_routes);

module.exports = router;