import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import VideoLength from "../shared/videoLength";
import { BsFillCheckCircleFill } from "react-icons/bs";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video.videoId}`}>
      <div className="flex flex-col mb-3">
        <div className="relative h-48 md:h-52 md:rounded-xl overflow-hidden">
          <img
            src={video?.thumbnails?.[0]?.url}
            className="h-full w-full object-cover"
            alt=""
          />
          {video?.lengthSeconds && (
            <VideoLength time={video?.lengthSeconds}></VideoLength>
          )}
        </div>
        <div className="flex text-white mt-3">
          <div className="flex items-start">
            <div className="flex h-9 w-9 overflow-hidden rounded-full">
              <img
                src={video?.author?.avatar[0]?.url}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm line-clamp-2 font-bold text-[16px]">
              {video.title}
            </span>
            <span className="flex items-center text-[14px] text-white/[0.6] mt-2 font-semibold">
              {video?.author?.title}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="text-[12px] text-white/[0.5] ml-1"></BsFillCheckCircleFill>
              )}
            </span>
            <div className="flex text-white/[0.7] text-[14px] overflow-hidden truncate">
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
              <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                .
              </span>
              <span className="truncate">{video?.publishedTimeText}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
