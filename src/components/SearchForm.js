import React from "react";
import { IoMdSearch } from "react-icons/io";

const SearchForm = ({ handleInput, handleSubmit, isError }) => {
  return (
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
  );
};

export default SearchForm;
