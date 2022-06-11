import React from "react";
import { BiMenu } from "react-icons/bi";
import ThemeToggler from "./ThemeToggler";

interface IProps {
  showSidebar: (visible: boolean) => void;
  sidebarVisiblity: boolean;
}

function Header({ showSidebar, sidebarVisiblity }: IProps) {
  return (
    <div className="flex justify-start bg-[#fdfff5] shadow-md dark:bg-[#03111E] h-auto p-4 transition-all delay-150">
      <button
        onClick={() => showSidebar(!sidebarVisiblity)}
        className="appearance-none outline-none border-2 rounded-md"
      >
        <BiMenu className="text-black dark:text-white text-4xl " />
      </button>
      <div className="font-bold text-center text-black dark:text-white  text-[1.6rem] mx-auto">
        Exchange Rate
      </div>
      <ThemeToggler />
    </div>
  );
}

export default Header;
