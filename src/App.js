import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchForm from "./components/SearchForm";
import Loader from "./components/Loader";
import useWeatherData from "./hooks/useWeatherData";
import './App.css'; // Import custom styles

const App = () => {
  const [location, setLocation] = useState("Bucharest");
  const [inputValue, setInputValue] = useState("");
  const { data, isLoading, isError, handleSearch } = useWeatherData(location);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(inputValue, setLocation);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      <SearchForm
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        isError={isError}
      />
      <WeatherCard data={data} />
    </div>
  );
};

export default App;
