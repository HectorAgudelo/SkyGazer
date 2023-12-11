import { getAPOD } from "../APIs/NasaApi";

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
    <div className="relative text-white rounded-lg overflow-hidden">
      {renderMedia()}
      <div className="flex flex-col justify-center absolute top-0 left-0 p-6 bg-slate-800 opacity-90 font-sans font-thin w-1/2 h-full">
        <h3>Image of the day</h3>
        <h2 className="text-4xl md:text-5xl font-serif">{title}</h2>
        <span className="h-px w-full bg-slate-300 mt-6" ></span>
        <p className="text-sm mt-6">{date}</p>
        <p className="text-sm md:text-[1rem] mt-2">{explanation}</p>
      
      </div>
    </div>
  );
}

export default ImageBanner;
