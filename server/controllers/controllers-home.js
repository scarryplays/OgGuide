const axios = require("axios");
require("dotenv").config();

/*
  ===============================
  HOME / SEARCH CONTROLLER
  ===============================
*/

const home = async (req, res) => {
  try {

    const { searchPlace } = req.query;

    if (!searchPlace) {
      return res.status(400).json({ error: "Place is required in request query" });
    }

    const username = process.env.GEONAMES_USERNAME;
    if (!username) {
      return res.status(500).json({ error: "GeoNames username not set in .env" });
    }

    const geoAPI = `https://secure.geonames.org/searchJSON?q=${searchPlace}&maxRows=1&username=${username}`;

    const geoResponse = await axios.get(geoAPI);

    if (
      !geoResponse.data.geonames ||
      geoResponse.data.geonames.length === 0
    ) {
      return res.status(404).json({ error: "Location not found" });
    }

    const location = geoResponse.data.geonames[0];

    // ===============================
    //  WIKIPEDIA SUGGESTIONS 
    // ===============================

    const wikiURL1 =
      "https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:Tourist_attractions&cmlimit=10&origin=*";

    const wikiURL2 =
      "https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:National_parks&cmlimit=10&origin=*";

    const [wiki1, wiki2] = await Promise.all([
      axios.get(wikiURL1, { headers: { "User-Agent": "OG-Guide-App" } }),
      axios.get(wikiURL2, { headers: { "User-Agent": "OG-Guide-App" } }),
    ]);

    const suggestions1 = wiki1.data.query.categorymembers || [];
    const suggestions2 = wiki2.data.query.categorymembers || [];

    // ===============================
    //  FOURSQUARE (CURRENTLY OFF)
    // ===============================

    /*
    let fsqData = [];
    try {
      const fsqURL = `https://api.foursquare.com/v3/places/search?ll=${location.lat},${location.lng}&radius=5000`;

      const fsqResponse = await axios.get(fsqURL, {
        headers: {
          Authorization: process.env.FSQ_API_KEY,
          Accept: "application/json",
        },
      });

      fsqData = fsqResponse.data.results || [];
    } catch (err) {
      console.log("Foursquare failed:", err.message);
    }
    */

    const fsqData = []; // temporary empty

    // 7️⃣ Final response
    return res.status(200).json({
      name: location.name,
      country: location.countryName,
      lat: location.lat,
      lng: location.lng,
      foursquare_results: fsqData,
      suggestions1: suggestions1,
      suggestions2: suggestions2,
    });

  } catch (error) {
    console.error("SERVER ERROR:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { home };
