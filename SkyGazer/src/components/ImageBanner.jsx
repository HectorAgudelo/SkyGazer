import { getAPOD } from "../APIs/NasaApi";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

//DUMMYDATA
// const result = {
//   date: "2023-12-11",
//   explanation:
//     "The surface of our Sun is constantly changing.  Some years it is quiet, showing relatively few sunspots and active regions. Other years it is churning, showing many sunspots and throwing frequent Coronal Mass Ejections (CMEs) and flares. Reacting to magnetism, our Sun's surface goes through periods of relative calm, called Solar Minimum and relative unrest, called Solar Maximum, every 11 years. The featured video shows on the left a month in late 2019 when the Sun was near Solar Minimum, while on the right a month in 2014 when near Solar Maximum.  The video was taken by NASA's Solar Dynamic Observatory in far ultraviolet light. Our Sun is progressing again toward Solar Maximum in 2025, but displaying even now a surface with a surprisingly high amount of activity.   Night Sky Network webinar: APOD editor to review coolest space images of 2023",
//   media_type: "video",
//   service_version: "v1",
//   thumbnail_url: "https://img.youtube.com/vi/JqH0diwqcUM/0.jpg",
//   title: "Solar Minimum versus Solar Maximum",
//   url: "https://www.youtube.com/embed/JqH0diwqcUM?rel=0",
// };

async function fetchAPOD() {
  try {
    const data = await getAPOD();
    return data;
  } catch (error) {
    console.error("Error fetching APOD data:", error);
    return {};
  }
}

function ImageBanner() {
  const containerRef = useRef(null);
  const [APODData, setAPODData] = useState({
    media_type: "",
    thumbnail_url: "",
    title: "",
    explanation: "",
    date: "",
    url: "",
  });

  useEffect(() => {
    fetchAPOD().then((data) => setAPODData(data));
  }, []);

  const { media_type, thumbnail_url, title, explanation, date, url } = APODData;

  const imageDate = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[imageDate.getMonth()];
  const day = imageDate.getDate();
  const year = imageDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

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
        <div className=" h-screen overflow-hidden">
          <img className="h-full object-cover" src={url} alt={title} />
        </div>
      );
    } else {
      return null;
    }
  };

  const scrollToExplanation = () => {
    const explanationElement = containerRef.current.querySelector(
      ".snap-start:last-of-type"
    );
    if (explanationElement) {
      explanationElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative text-white rounded-lg h-[100vh]">
      <div className="absolute top-0 left-0 z-2 w-full"> {renderMedia()} </div>

      <div
        className=" flex flex-col justify-center absolute top-0 left-0 bg-gray-900 opacity-90 font-sans w-1/2 h-[100vh] overflow-auto px-6"
        ref={containerRef}
      >
        <div className="h-[calc(100vh - 40px)] overflow-auto snap-y snap-mandatory ">
          <div className="h-screen snap-start flex flex-col items-center justify-center">
            <div className=" h-full flex flex-col justify-center">
              <h3 className="text-center mb-4 uppercase text-red-700">
                Image of the day
              </h3>
              <h2 className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-center">
                {title}
              </h2>
            </div>

            <div
              className=" cursor-pointer text-2xl mt-auto mb-8 "
              onClick={scrollToExplanation}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </div>

          <div className="h-[100vh] flex flex-col justify-center snap-start px-8">
            <p className="text-sm mt-6 text-red-700 font-bold">
              {formattedDate}
            </p>
            <p className="font-extralight text-md md:text-[1rem] mt-2">
              {explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageBanner;
