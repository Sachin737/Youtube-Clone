import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchData } from "../utils/api";
import { LevelContext } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideos from "./SearchResultVideos";

const SearchResults = () => {
  const { searchQuery } = useParams();
  const [result, setResult] = useState();
  const { setLoading } = useContext(LevelContext);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    fetchData(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setResult(res?.contents);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
    <LeftNav />
    <div className="grow flex justify-center bg-black w-[calc(100%-240px)] h-full overflow-y-auto">
        <div className="grid grid-cols-1 p-5">
            {result?.map((item) => {
                if (item?.type !== "video") return false;
                let video = item.video;
                return (
                    <SearchResultVideos
                        key={video.videoId}
                        video={video}
                    />
                );
            })}
        </div>
    </div>
</div>
  );
};

export default SearchResults;
