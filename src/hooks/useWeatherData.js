import { useEffect, useState } from "react";
import axios from "axios";

const APIKey = "f11e2ae1bc7bd1f373c7384bc3331522";

const useWeatherData = (location) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

  const handleSearch = (inputValue, setLocation) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 1000); // Reset error state after 1 second
    }
  };

  return { data, isLoading, isError, handleSearch };
};

export default useWeatherData;
