import React from "react";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from "react-icons/io";
import { BsCloudHaze2Fill, BsCloudDrizzle, BsEye, BsWater, BsThermometer, BsWind } from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";

const WeatherCard = ({ data }) => {
  // Icons based on weather conditions
  let icon;
  switch (data?.weather[0]?.main) {
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
    <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
      <div>
        {/* Card top */}
        <div className="flex items-center gap-x-5 mb-6">
          <div className="text-[87px]">{icon}</div>
          <div>
            {/* Country name */}
            <div className="text-2xl font-semibold">
              {data?.name}, {data?.sys?.country}
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
            {data && parseInt(data.main.temp - 273.15)}
          </div>
          {/* Celsius */}
          <div className="text-4xl">
            <TbTemperatureCelsius />
          </div>
        </div>
        {/* Weather description */}
        <div className="text-center text-2xl mb-6">{data?.weather[0]?.description}</div>
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
                <span className="ml-2">{data?.visibility / 1000} km</span>
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
                  {data && parseInt(data.main.feels_like - 273.15)}
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
                Humidity <span className="ml-2">{data?.main?.humidity} %</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              {/* Icons */}
              <div className="text-[20px]">
                <BsWind />
              </div>
              <div>
                Wind <span className="ml-2">{data?.wind?.speed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
