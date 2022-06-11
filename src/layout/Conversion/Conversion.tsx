import React from "react";
import BaseCurrency from "./components/BaseCurrency";
import SelectedCurrency from "./components/SelectedCurrency";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

function Conversion() {
  const selectedCurrencies = useAppSelector(
    (state) => state.selectedCurrencies.selectedCurrencies
  );
  const baseCurrency = useAppSelector(
    (state) => state.baseCurrency.baseCurrency
  );

  const getSelectedCurrencies =
    selectedCurrencies &&
    selectedCurrencies.map((currency, index) => (
      <SelectedCurrency
        key={`${index}-${currency.code}`}
        code={currency.code}
        name={currency.name}
        symbol={currency.symbol}
        rate={currency.rate}
        value={currency.value}
        flag={currency.flag}
      />
    ));
  return (
    <>
      <BaseCurrency
        code={baseCurrency.code}
        name={baseCurrency.name}
        symbol={baseCurrency.symbol}
        flag={baseCurrency.flag}
        value={baseCurrency.value}
      />
      <div className="m-5 p-1 overflow-y-auto h-[65%] scroll-smooth no-scrollbar">
        {getSelectedCurrencies}
      </div>
    </>
  );
}

export default Conversion;
