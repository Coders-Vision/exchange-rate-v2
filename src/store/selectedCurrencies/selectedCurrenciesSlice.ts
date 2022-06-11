import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICurrency } from "../../model/currency.model";
import { IRate } from "../../model/rate.model";
import List from "../../data/list.json";

export interface IConverionParams {
  value: number;
  code: string;
}

export interface IinitialState {
  selectedCurrencies: ICurrency[];
  rateDate: string;
}

const getDefaultCurrencies = () => {
  var codes = ["EUR", "GBP", "JPY"];
  const pickedCurrencies = List.filter(
    (currency) => codes.indexOf(currency.code) > -1
  );
  return pickedCurrencies;
};

const initialState: IinitialState = {
  selectedCurrencies: getDefaultCurrencies(),
  rateDate: "YYYY-MM-DD",
};

export const selectedCurrencies = createSlice({
  name: "selectedCurrencies",
  initialState,
  reducers: {
    addCurrency: (state, action: PayloadAction<ICurrency>) => {
      const newCurrency = action.payload;
      const check = state.selectedCurrencies.some(
        (currency) => currency.code === newCurrency.code
      );
      if (!check) {
        state.selectedCurrencies.push(newCurrency);
      }
    },
    removeCurrency: (state, action: PayloadAction<ICurrency>) => {
      const removeCurrency = action.payload;
      const updatedCurrencies = state.selectedCurrencies.filter(
        (currency) => currency.code !== removeCurrency.code
      );
      state.selectedCurrencies = updatedCurrencies;
    },
    setRate: (state, action: PayloadAction<IRate>) => {
      const Rates = action.payload;
      let updatedRates = [...state.selectedCurrencies];
      updatedRates.forEach(
        (currency) => (currency.rate = Rates[currency.code])
      );
      state.selectedCurrencies = updatedRates;
    },
    setDate: (state, action: PayloadAction<string>) => {
      const date = action.payload;
      if (date.length > 0) {
        state.rateDate = date;
      }
    },
    setValue: (state, action: PayloadAction<IConverionParams>) => {
      const value = action.payload.value;
      const code = action.payload.code;
      let currencies = [...state.selectedCurrencies];
      currencies.find((currency) => currency.code === code)!.value = value;
      state.selectedCurrencies = currencies;
    },
    baseToSelected: (state, action: PayloadAction<number>) => {
      const value = action.payload;
      let converted = [...state.selectedCurrencies];
      converted.map((currency) =>
        currency.rate
          ? (currency.value = parseFloat((value * currency.rate).toFixed(3)))
          : currency
      );
      state.selectedCurrencies = converted;
    },
  },
  extraReducers: {},
});

export const {
  addCurrency,
  removeCurrency,
  setRate,
  setDate,
  setValue,
  baseToSelected,
} = selectedCurrencies.actions;
export const selectSelectedCurrencies = (state: RootState) =>
  state.selectedCurrencies;

export default selectedCurrencies.reducer;
