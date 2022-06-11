import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  setRate,
  setDate,
  baseToSelected,
} from "../../../store/selectedCurrencies/selectedCurrenciesSlice";

import { ICurrency } from "../../../model/currency.model";
import { latestCurrency } from "../../../services/currencyService";

function BaseCurrency({ code, name, symbol, flag, value }: ICurrency) {
  const [base, setBase] = useState<number>(0);
  const [currentBase, setCurrentBase] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getLatestRates = async () => {
      if (code.length !== 0 && currentBase !== code) {
        const res = await latestCurrency(code);
        const data = await res.data;
        dispatch(setRate(data?.rates));
        dispatch(setDate(data?.date));
        setCurrentBase(code);
      }
    };
    getLatestRates();
    setBase(value ?? 0);
  }, [value, currentBase, dispatch]);

  const convertToSelected = (value: number) => {
    dispatch(baseToSelected(value));
  };

  const handleChange = (value: string) => {
    setBase(parseFloat(value));
    convertToSelected(parseFloat(value));
  };

  return (
    <div className="sm:w-[50%] md:w-[65%] sm:mx-auto mx-4 md:mx-auto">
      <div className="h-auto flex md:justify-between dark:bg-[#0f9150] bg-[#16b766] mb-2 rounded-xl xs:px-2 px-10 transition-all delay-150">
        <img
          className="w-[56px] h-[40px] rounded-xl p-1 m-3"
          src={`${flag}`}
          alt={`${name}`}
        />
        <span className="text-justify text-lg font-bold px-[10px] py-[20px]">
          {symbol ?? code}
        </span>
        <div className="p-1 ">
          <input
            className="default-input bg-[#0f9150] mb-1 w-[82%]"
            type="number"
            min="0.000"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
            value={base}
            placeholder="0.000"
          />
          <div className="text-sm font-bold">{name}</div>
          <div className="leading-4 text-xs font-light">Selected Currency</div>
        </div>
      </div>
    </div>
  );
}

export default BaseCurrency;
