const router = require('express').Router();

const article_routes = require('./articles-route');
router.use('/api', article_routes);

module.exports = router;