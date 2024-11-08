const axios = require('axios');
const cheerio = require('cheerio');
const allowedUrls = require('../utils/allowedUrls');
const { CheerioWebBaseLoader } = require('@langchain/community/document_loaders/web/cheerio');

exports.scrapeText = async (req, res) => {
    try {
        const scrapedData = [];

        for (const url of allowedUrls) {
            const loader = new CheerioWebBaseLoader(url, {
                selector: "body",
            });

            const docs = await loader.load();

            const text = docs.map(doc => doc.pageContent.trim())
                            .join(' ') 
                            .replace(/\s+/g, ' ') 
                            .replace(/\t+/g, ' ') 
                            .replace(/\n+/g, ' ')  
                            .replace(/^\s+|\s+$/g, ''); 

            scrapedData.push({ url, text });
        }

        res.json(scrapedData);
    } catch (error) {
        console.error('Error scraping the websites:', error);
        res.status(500).json({ error: 'Failed to scrape the websites' });
    }
};
