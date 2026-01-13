const User = require("../models/user-models");
const bcrypt = require("bcryptjs");
const axios = require("axios");


const chatBox = async (req,res) => {
  try {
    const { askGuide } = req.body;  

    if (!askGuide) {
        return res.status(400).json({ error: "Query is required" });
    }


    const wikiGuideUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${askGuide}&format=json`;

    const wikiGuideResult = await axios.get(wikiGuideUrl);
    const searchResults = wikiGuideResult.data.query.search;

    if (!searchResults.length) {
        return res.status(404).json({ error: "No results found " });
    }

    const askGuideWikiSummaryURL = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchResults[0].title}`;
    const summaryResponse = await axios.get(askGuideWikiSummaryURL);



    res.status(200).json({
        // askGuide:askGuide,
        // results: wikiResponse.data.query.search.slice(0, 3),
        title: summaryResponse.data.title,
        description: summaryResponse.data.extract, 
        image: summaryResponse.data.thumbnail ? summaryResponse.data.thumbnail.source : null,
        full_page_url: summaryResponse.data.content_urls.desktop.page 
    });
  } catch (error) {
    
  }
}

module.exports = {chatBox};