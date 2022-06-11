import React, { useState, useEffect, useMemo } from "react";
import Currency from "./components/Currency";
import SearchBar from "./components/SearchBar";
import List from "../../data/list.json";
import { ICurrency } from "../../model/currency.model";

interface IProps {
  sidebarVisiblity: boolean;
}

function Sidebar({ sidebarVisiblity }: IProps) {
  const [search, setSearch] = useState<string>("");
  const [currencyList, setCurrency] = useState<ICurrency[]>([]);

  useEffect(() => {
    const filter = List.filter((currency) =>
      `${currency.code}-${currency.name}`.toLowerCase().includes(search.toLocaleLowerCase())
    );
    setCurrency(filter);
  }, [search]);

  const getCurrencies = useMemo(() => {
    return (
      currencyList &&
      currencyList.map((currency, index) => (
        <Currency
          key={`${currency.code}-${index}`}
          name={currency.name}
          symbol={currency.symbol}
          code={currency.code}
          flag={currency.flag}
        />
      ))
    );
  }, [search]);

  return (
    <div
      className={`absolute top-[72px] w-[100%] h-[90%] bg-white dark:bg-[#1b1f3d] overflow-y-auto ${
        sidebarVisiblity
          ? "left-0 transition-all ease-out delay-150"
          : "left-[-100%] transition-all ease-in delay-150"
      } no-scrollbar`}
    >
      <SearchBar search={search} setSearch={setSearch} />

      {getCurrencies.length > 0 ? (
        <div className="scrollbar-hide">{getCurrencies}</div>
      ) : (
        <h2 className="text-l text-gray-500 text-center mt-52">
          Please enter a Country or currency name
        </h2>
      )}
    </div>
  );
}

export default Sidebar;
