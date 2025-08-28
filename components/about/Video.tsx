
"use client"
import React from "react";

const Video = () => {
  return (
    <div className="w-full pt-15 h-[300px] sm:h-[375px] md:h-[450px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] max-h-[700px] flex justify-center items-center">
      <iframe
        className="w-full h-full rounded-2xl shadow-lg"
        src="https://www.youtube.com/embed/E-1Wam6vIf0"
        title="Car video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
