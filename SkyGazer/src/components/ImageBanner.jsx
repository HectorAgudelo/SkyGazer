import { getAPOD } from "../APIs/NasaApi";

import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

const result = {
  date: "2023-12-11",
  explanation:
    "The surface of our Sun is constantly changing.  Some years it is quiet, showing relatively few sunspots and active regions. Other years it is churning, showing many sunspots and throwing frequent Coronal Mass Ejections (CMEs) and flares. Reacting to magnetism, our Sun's surface goes through periods of relative calm, called Solar Minimum and relative unrest, called Solar Maximum, every 11 years. The featured video shows on the left a month in late 2019 when the Sun was near Solar Minimum, while on the right a month in 2014 when near Solar Maximum.  The video was taken by NASA's Solar Dynamic Observatory in far ultraviolet light. Our Sun is progressing again toward Solar Maximum in 2025, but displaying even now a surface with a surprisingly high amount of activity.   Night Sky Network webinar: APOD editor to review coolest space images of 2023",
  media_type: "video",
  service_version: "v1",
  thumbnail_url: "https://img.youtube.com/vi/JqH0diwqcUM/0.jpg",
  title: "Solar Minimum versus Solar Maximum",
  url: "https://www.youtube.com/embed/JqH0diwqcUM?rel=0",
};

function ImageBanner() {
  //getAPOD().then((res) => console.log(res));
  const { media_type, thumbnail_url, title, explanation, date, url } = result;
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event) => {
    const { target } = event;
    setScrollTop(target.scrollTop);
  };

  const renderMedia = () => {
    if (media_type === "video") {
      return (
        <iframe
          className="w-full h-screen"
          src={url}
          title={title}
          allowFullScreen
        ></iframe>
      );
    } else if (media_type === "image") {
      return (
        <img
          className="w-full h-72 md:h-96 object-cover"
          src={thumbnail_url}
          alt={title}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="relative text-white rounded-lg h-[100vh]">
      <div className="absolute top-0 left-0 z-2 w-full"> {renderMedia()} </div>

      <div className=" flex flex-col justify-center absolute top-0 left-0 p-6 bg-slate-800 opacity-97 font-sans w-1/2 h-[100vh] overflow-auto">
        <div className="h-[100vh] overflow-auto snap-y snap-mandatory">
        <div className="h-screen snap-start flex flex-col justify-center items-center">
  <h3 className="text-center mb-4 uppercase text-red-700">Image of the day</h3>
  <h2 className="text-7xl md:text-8xl font-serif text-center">{title}</h2>
  {/* <div >
    <FontAwesomeIcon icon={faArrowCircleDown} />
  </div> */}
</div>

    
          <div className="h-[100vh] flex flex-col justify-center snap-start font-thin">
            <p className="text-sm mt-6">{date}</p>
            <p className="text-nd md:text-[1rem] mt-2">{explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageBanner;
