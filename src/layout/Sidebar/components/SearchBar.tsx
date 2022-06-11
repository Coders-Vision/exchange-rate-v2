import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

type IProps = {
  search: string;
  setSearch: (value: string) => void;
};

function SearchBar({ search, setSearch }: IProps) {
  return (
    <div className="sticky top-0 p-3 bg-white dark:bg-[#1b1f3d] z-50 transition-all delay-150">
      <div className="border-2 border-solid border-gray-200 rounded-lg p-2">
        <input
          className="bg-white dark:bg-[#1b1f3d] text-black dark:text-white p-1 appearance-none outline-none sm:w-60 md:w-80 transition-all delay-150"
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder="Search (i.e USD)"
        />
        <BiSearchAlt2 className="text-[#282828] dark:text-[#ffffff] font-bold w-6 h-6 mt-1 float-right" />
      </div>
    </div>
  );
}

export default SearchBar;
