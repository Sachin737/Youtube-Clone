import React, { useState, useEffect, useContext } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { abbreviateNumber } from "js-abbreviation-number";
import ReactPlayer from "react-player/youtube";

import { BsFillCheckCircleFill } from "react-icons/bs";

import { fetchData } from "../utils/api";
import { LevelContext } from "../context/contextApi";
import SuggestionVideos from "./SuggestionVideos";

const VideoDeatils = () => {
  const [relatedVideos, setRelatedVideos] = useState();
  const [video, setVideo] = useState();
  const { id } = useParams();
  const { setLoading } = useContext(LevelContext);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideo();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideo = () => {
    setLoading(true);
    fetchData(`video/details/?id=${id}`).then((res) => {
      console.log(res);
      setVideo(res);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchData(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res);
      setRelatedVideos(res);
      setLoading(false);
    });
  };

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
      <div className="w-full max-w-[1680px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[650px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            {" "}
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              height={"100%"}
              width={"100%"}
              style={{ backgroundColor: "#000" }}
              playing={true}
            ></ReactPlayer>
          </div>

          <div className="font-medium text-sm text-white md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 overflow-hidden rounded-full">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                    alt=""
                  />
                </div>
              </div>

              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-[12px] text-white/[0.5] ml-1"></BsFillCheckCircleFill>
                  )}
                </div>

                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>

            <div className="flex text-white mt-4 md:mt-0">
              <div className="h-11 px-6 bg-white/[0.15] flex items-center justify-center  rounded-3xl">
                <AiOutlineLike className="text-xl text-white mr-2" />
                <span>{`${abbreviateNumber(
                  video?.stats?.likes,
                  2
                )} Likes`}</span>
              </div>

              <div className="h-11 px-6 bg-white/[0.15] flex items-center justify-center  rounded-3xl ml-4">
                <AiOutlineLike className="text-xl text-white mr-2" />
                <span>{`${abbreviateNumber(
                  video?.stats?.views,
                  2
                )} Views`}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-6 px-4 overflow-y-auto scrollbar-hide lg:w-[350px] xl:w-[400px]">
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SuggestionVideos key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDeatils;
