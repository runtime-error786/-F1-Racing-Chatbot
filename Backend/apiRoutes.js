const express = require('express');
const router = express.Router();
const { chatApi } = require('./Controller/scraperController'); 

router.post('/scrape_and_embed', chatApi);

module.exports = router;
