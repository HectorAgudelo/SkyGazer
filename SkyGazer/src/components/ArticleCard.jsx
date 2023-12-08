import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faComment,
  faArrowLeft,
  faArrowRight,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";

const ArticleCard = ({
  urlToImage,
  title,
  time,
  content,
  author,
  className,
  cardWithDescription,
  id,
}) => {
  const [isDetailed, setIsDetailed] = useState(false);

  const toggleDetailedView = () => {
    setIsDetailed(!isDetailed);
  };

  return (
    <div
      className={`${className}  ${
        isDetailed ? "h-full" : "h-auto"
      } max-h-[30rem] flex justify-between rounded-sm shadow-md w-auto min-w-[250px] border border-gray-800`}
    >
      {/* <div> */}
      <div
        className={`${
          id === 0 || id === 5 ? "sm:w-full md:w-1/2" : "w-full h-1/2"
        } overflow-hidden rounded-t-sm`}
      >
        <img
          src={urlToImage}
          alt="Article"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className={`p-6 pt-8 ${
          id === 0 || id === 5
            ? "h-full w-1/2 sm:w-full md:w-1/2"
            : "h-auto w-full"
        } flex flex-col justify-between `}
      >
        <div className="flex flex-col justify-start">
          <h2 className={`${cardWithDescription ? 'text-2xl' : 'text-lg'} text-gray-300 my-4 font-serif`}>{title}</h2>
          {cardWithDescription && (
            <>
            <span className="bg-slate-800 h-px mt-2"></span>
            <p className=" text-gray-300 font-serif text-sm font-extralight tracking-wide mt-4">
              {cardWithDescription}
            </p>
            </>
          )}
        </div>
   
        <div className="flex flex-col items-start justify-end mt-4">
        <span className="bg-slate-800 h-px w-full my-4"></span>
          <div className="flex justify-between w-full">
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
         
            <p className="text-gray-400 font-light text-sm">
              <FontAwesomeIcon icon={faBookmark} />
            </p>
          </div>
   
          {/* <button
            onClick={toggleDetailedView}
            className="text-slate-400 text-sm font-sans p-2 hover:underline focus:outline-none w-fit"
          >
            <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
          </button> */}
        </div>

        {isDetailed && (
          <DetailedCard
            content={content}
            author={author}
            image={urlToImage}
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
