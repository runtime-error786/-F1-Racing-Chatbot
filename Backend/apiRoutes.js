const express = require('express');
const router = express.Router();
const { scrapeText } = require('./Controller/scraperController'); 

router.post('/scrape', scrapeText);

module.exports = router;
