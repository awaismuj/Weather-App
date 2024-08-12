import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzle,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import './App.css'; // Import custom styles

const APIKey = "f11e2ae1bc7bd1f373c7384bc3331522";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Bucharest");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      setLocation(inputValue);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 1000); // Reset error state after 1 second
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}`;
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
        setTimeout(() => setIsError(false), 1000); // Reset error state after 1 second
      });
  }, [location]);

  // Spinner
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
        <ImSpinner8 className="text-5xl animate-spin text-white" />
      </div>
    );
  }

  // Icons
  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzle />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    default:
      icon = <IoMdSunny />;
      break;
  }

  const date = new Date();
  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {/* Form */}
      <form
        className={`h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8 ${isError ? 'shake' : ''}`}
        onSubmit={handleSubmit}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={handleInput}
            className="flex-1 bg-transparent placeholder:text-white outline-none text-[15px] text-white font-light pl-6 h-full"
            type="text"
            placeholder="Search by city or country"
          />
          <button
            type="submit"
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* Card */}
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        <div>
          {/* Card top */}
          <div className="flex items-center gap-x-5 mb-6">
            <div className="text-[87px]">{icon}</div>
            <div>
              {/* Country name */}
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              {/* Date */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* Card body */}
          <div className="flex justify-center items-center mb-6">
            {/* Temperature */}
            <div className="text-[144px] leading-none font-light">
              {parseInt(data.main.temp - 273.15)}
            </div>
            {/* Celsius */}
            <div className="text-4xl">
              <TbTemperatureCelsius />
            </div>
          </div>
          {/* Weather description */}
          <div className="text-center text-2xl mb-6">{data.weather[0].description}</div>
          {/* Card bottom */}
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between mb-6">
              <div className="flex items-center gap-x-2">
                {/* Icons */}
                <div className="text-[20px]">
                  <BsEye />
                </div>
                <div>
                  Visibility{" "}
                  <span className="ml-2">{data.visibility / 1000} km</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                {/* Icons */}
                <div className="text-[20px]">
                  <BsThermometer />
                </div>
                <div className="flex">
                  Feels like
                  <div className="flex ml-2">
                    {parseInt(data.main.feels_like - 273.15)}
                    <TbTemperatureCelsius />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center gap-x-2">
                {/* Icons */}
                <div className="text-[20px]">
                  <BsWater />
                </div>
                <div>
                  Humidity <span className="ml-2">{data.main.humidity} %</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                {/* Icons */}
                <div className="text-[20px]">
                  <BsWind />
                </div>
                <div>
                  Wind <span className="ml-2">{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
