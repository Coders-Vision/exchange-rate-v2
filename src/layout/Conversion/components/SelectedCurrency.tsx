import React from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { ICurrency } from "../../../model/currency.model";

import {
  removeCurrency,
  setValue,
} from "../../../store/selectedCurrencies/selectedCurrenciesSlice";

import {
  setCurrency,
  selectedTobase,
} from "../../../store/baseCurrency/baseCurrencySlice";

function SelectedCurrency({
  code,
  name,
  symbol,
  rate,
  value,
  flag,
}: ICurrency) {
  const dispatch = useAppDispatch();

  const baseCurrency = useAppSelector(
    (state) => state.baseCurrency.baseCurrency
  );

  const setBaseCurrency = (
    currency: ICurrency,
    element: React.MouseEvent<HTMLElement>
  ) => {
    const elementType = element.target as Element;
    if (elementType.nodeName !== "INPUT" && elementType.nodeName !== "SPAN") {
      dispatch(setCurrency(currency));
      dispatch(removeCurrency(currency));
    }
  };

  const handleChange = (value: number, rate: number, code: string) => {
    dispatch(
      selectedTobase({
        rate,
        value,
      })
    );
    const val = { value, code };
    dispatch(setValue(val));
  };

  return (
    <div
      onClick={(e) =>
        setBaseCurrency({ code, name, symbol, rate, value, flag }, e)
      }
      className="bg-[#fdfff5]  text-black dark:bg-[#272727] dark:text-white shadow-md mb-2 rounded-lg h-auto w-auto flex justify-between hover:bg-[#6873d6] dark:hover:bg-[#252A57] transition-all delay-150 cursor-pointer"
    >
      <img
        className="w-[56px] h-[40px] rounded-xl py-[5px] pl-[5px] m-[10px]"
        src={flag}
        alt=""
      />
      <span className="text-justify text-lg font-bold py-[10px] px-[20px] basis-20">
        {symbol}
      </span>
      <div className="p-3 sm:w-1/2 md:basis-20">
        <input
          className="default-input mb-1 w-3/4 md:w-auto p-[2px]"
          type="number"
          min="0.000"
          placeholder="0.000"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(parseFloat(e.target.value), rate ?? 1, code)
          }
          value={value}
        />
        <div className=" w-auto overflow-hidden whitespace-no-wrap text-ellipsis font-bold">
          {code}-{name}
        </div>
        <div className="leading-5 text-xs font-light">
          {`1 ${baseCurrency.code} = ${rate ?? 1} ${code}`}
        </div>
      </div>
      <span
        onClick={() => dispatch(removeCurrency({ code, flag, name, symbol }))}
        className="pr-[10px] pb-[5px] hover:scale-x-105 transition delay-75 text-base"
      >
        &times;
      </span>
    </div>
  );
}

export default SelectedCurrency;
