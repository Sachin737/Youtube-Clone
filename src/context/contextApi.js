import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../utils/api";


export const LevelContext = createContext();

export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchCategoryData(selectedCategory);
  }, [selectedCategory]);

  const fetchCategoryData = (query) => {
    setLoading(true);
    fetchData(`search/?q=${query}`).then((res) => {
      console.log(res.contents);
      setSearchResults(res.contents);
      setLoading(false);
    });
  };

  return (
    <LevelContext.Provider
      value={{
        loading,
        setLoading,
        selectedCategory,
        setSelectedCategory,
        searchResults,
        setSearchResults,
        mobileMenu,
        setMobileMenu,
      }}
    >
      {props.children}
    </LevelContext.Provider>
  );
};
