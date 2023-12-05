import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faComment,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";




const ArticleCard = ({ image, title, time, content, author }) => {
  const [isDetailed, setIsDetailed] = useState(false);

  const toggleDetailedView = () => {
    setIsDetailed(!isDetailed);
  };

  return (
    <div className="flex flex-col m-2 bg-slate-900 rounded-sm shadow-md w-96">
      <div className="w-full h-60 overflow-hidden rounded-t-sm">
        <img src={image} alt="Article" className="w-full h-full object-cover" />
      </div>

      <div className={`p-4 pt-8 ${isDetailed ? "h-full" : "h-[14rem]"}`}>
        <p className="text-gray-400 text-sm mb-2 border border-gray-400 w-fit py-px px-4">
          tag
        </p>
        <h2 className="text-gray-300 text-lg my-4 font-serif">{title}</h2>
        <div className="flex items-center justify-between mt-4">
          <div className="flex">
            <p className="text-gray-400 flex items-center mr-4 font-light text-xs">
              <FontAwesomeIcon icon={faClock} className="mr-2" />

              {/* add function to calculate time? */}
              {time}
            </p>
            <p className="text-gray-400 flex items-center font-light text-xs">
              <FontAwesomeIcon icon={faComment} className="mr-2" />4
            </p>
          </div>
          <button
            onClick={toggleDetailedView}
            className="text-slate-400 text-sm font-sans p-2 hover:underline focus:outline-none w-fit"
          >
            <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
          </button>
        </div>

        {isDetailed && (
          <DetailedCard
            content={content}
            author={author}
            image={image}
            title={title}
            time={time}
            toggleDetailedView={toggleDetailedView}
          />
        )}
      </div>
    </div>
  );
};


////////////////////////////////////////////

const DetailedCard = ({
  content,
  author,
  image,
  title,
  time,
  toggleDetailedView,
}) => {
  return (
    <div className="w-full h-full absolute top-0 left-0 ">
      <div className="w-full h-full relative max-h-[60vh]">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
        <h2 className="text-gray-300 text-2xl my-4 font-serif absolute z-20 bottom-10 left-10 w-2/3">
          {title}
        </h2>
        <img
          src={image}
          alt="Article"
          className="w-full h-full object-cover absolute z-0"
        />
      </div>
      <div className="p-12 h-full overflow-auto  bg-slate-900 relative">
        <div className="flex">
          <p className="text-gray-400 flex items-center mr-4 font-light text-xs">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            {time}
          </p>
          <p className="text-gray-400 flex items-center font-light text-xs">
            <FontAwesomeIcon icon={faComment} className="mr-2" />4
          </p>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          <span className="font-light">{author}</span>
        </p>
        <p className="text-gray-400 mt-14">{content}</p>
        <button onClick={toggleDetailedView}>
          <FontAwesomeIcon icon={faArrowLeft} className="mt-6 text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
