import React, { useState } from "react";
import Sidebar from "../layout/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Conversion from "../layout/Conversion/Conversion";
import { useAppSelector } from "../store/hooks";

function Home() {
  const [visible, setVisible] = useState<boolean>(false);
  const rateDate = useAppSelector((state) => state.selectedCurrencies.rateDate);

  return (
    <div className="mx-auto sm:w-screen md:screen lg:w-1/2 relative h-[100vh] bg-[#fdfff5] dark:bg-[#303030] overflow-x-hidden transition-all delay-150">
      <Header showSidebar={setVisible} sidebarVisiblity={visible} />
      <div className="font-hairline m-2 opacity-80 text-right text-xs">
        Rates Updated as of: {rateDate}
      </div>
      <Conversion />
      <Sidebar sidebarVisiblity={visible} />
    </div>
  );
}

export default Home;
