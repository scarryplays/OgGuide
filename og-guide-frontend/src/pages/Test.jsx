import React, { useState, useEffect } from "react";
import "../css-pages/home.css";

export const Test = () => {
  const [places, setPlaces] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const defaultLocations = ["Goa", "Uttrakhand", "Kerala", "Rajasthan", "Arunachal pradesh", "Ladakh"];

  useEffect(() => {
    fetchDefaultPlaces();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      shuffleLocation();
    }, 5000); // Change place every 5 seconds
    return () => clearInterval(interval);
  }, [places]);

  const fetchDefaultPlaces = async () => {
    const fetchedPlaces = await Promise.all(
      defaultLocations.map(async (place) => {
        const { image, description } = await fetchLocationData(place);
        return { title: place, image, description };
      })
    );
    setPlaces(fetchedPlaces);
  };

  const fetchLocationData = async (query) => {
    const searchRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=1&namespace=0&format=json&origin=*`
    );
    const searchData = await searchRes.json();
    const pageTitle = searchData[1][0];
    if (!pageTitle) return { image: null, description: "No description available" };

    const pageRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${pageTitle}&prop=pageimages|extracts&exintro&explaintext&pithumbsize=300&format=json&origin=*`
    );
    const pageData = await pageRes.json();
    const pages = pageData.query.pages;
    const pageKey = Object.keys(pages)[0];
    return {
      image: pages[pageKey].thumbnail?.source || null,
      description: pages[pageKey].extract || "No description available",
    };
  };

  const shuffleLocation = () => {
    if (places.length > 1) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * places.length);
      } while (newIndex === visibleIndex);
      setVisibleIndex(newIndex);
    }
  };

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="suggestion-wrapper">
      {places.length > 0 && (
        <div className="suggestion-card">
          <img
            src={places[visibleIndex]?.image || "https://via.placeholder.com/300"}
            alt={places[visibleIndex]?.title}
            className={`suggestion-img ${expanded ? "blur" : ""}`}
          />
          <button className="toggle-btn" onClick={toggleExpand}>
            {expanded ? "See Less" : "See More"}
          </button>
          <h2>{places[visibleIndex]?.title}</h2>
          <p className={`description ${expanded ? "expanded" : ""}`}>
            {places[visibleIndex]?.description}
          </p>
        </div>
      )}
    </div>
  );
};
