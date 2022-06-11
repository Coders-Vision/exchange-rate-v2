import React from "react";
import { BiCheck } from "react-icons/bi";
import { ICurrency } from "../../../model/currency.model";
import { latestCurrency } from "../../../services/currencyService";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  addCurrency,
  setRate,
} from "../../../store/selectedCurrencies/selectedCurrenciesSlice";

type IProps = {
  code: string;
  name: string;
  symbol: string;
  flag: string;
};

function Currency({ code, name, symbol, flag }: IProps) {
  const dispatch = useAppDispatch();

  const getBaseCurrency = useAppSelector(
    (state) => state.baseCurrency.baseCurrency
  );

  const getSelectedCurrency = (currencyCode: string) => {
    const currency = useAppSelector((state) =>
      state.selectedCurrencies.selectedCurrencies.some(
        ({ code }) => code === currencyCode
      )
    );
    return currency;
  };

  const getLatestRates = async () => {
    if (getBaseCurrency.code.length !== 0) {
      const { data } = await latestCurrency(getBaseCurrency.code);
      dispatch(setRate(data?.rates));
    }
  };

  const handleOnClick = (code_selected: string) => {
    if (getBaseCurrency.code !== code_selected) {
      dispatch(addCurrency({ code, flag, name, symbol } as ICurrency));
      getLatestRates();
    }
  };

  return (
    <div
      onClick={() => handleOnClick(code)}
      className={`flex items-center justify-start cursor-pointer border-b-2 dark:border-gray-600 bg-white dark:bg-[#1b1f3d] hover:bg-gray-100 transition-all delay-150 ${
        getSelectedCurrency(code) || getBaseCurrency.code === code
          ? "opacity-75 dark:opacity-80"
          : ""
      }`}
    >
      <img className="w-[56px] h-[40px] p-2 m-2" alt="" src={flag} />
      <span className="font-bold text-gray-800 dark:text-[#ffff] transition-all delay-150">
        {code}-{name}
      </span>
      <div className="ml-auto p-2">
        {getSelectedCurrency(code) || getBaseCurrency.code === code ? (
          <BiCheck className="text-2xl text-green-500 " />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Currency;
