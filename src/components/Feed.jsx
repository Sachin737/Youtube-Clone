import React, { useEffect, useContext } from "react";

import LeftNav from "./LeftNav";
import { LevelContext } from "../context/contextApi";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, searchResults } = useContext(LevelContext);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  }, []);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav></LeftNav>

      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-10">
          {!loading &&
            searchResults.map((el, index) => {
              if (el.type != "video") return false;

              // used index as key !!! error solved :)
              return <VideoCard key={index} video={el?.video}></VideoCard>;
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
