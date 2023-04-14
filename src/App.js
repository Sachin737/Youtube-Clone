import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./context/contextApi";
import Header from "./components/Header";
import VideoDetails from "./components/VideoDeatils";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResults";

const App = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="flex h-full flex-col">
          <Header></Header>
          <Routes>
            <Route exact path="/" element={<Feed />}></Route>
            <Route
              path="/searchResult/:searchQuery"
              element={<SearchResult />}
            ></Route>
            <Route path="/video/:id" element={<VideoDetails />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  );
};

export default App;
