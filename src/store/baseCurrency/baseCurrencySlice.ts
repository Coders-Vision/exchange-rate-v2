import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrency } from "../../model/currency.model";
import { RootState } from "../store";
//import List from "../../data/list.json";
export interface IinitialState {
  baseCurrency: ICurrency;
}

// const getDefaultCurrency = () => {
//   var code = "USD";
//   const pickedCurrency = List.filter((currency) => currency.code === code);
//   return pickedCurrency;
// };

const initialState: IinitialState = {
  baseCurrency: {
    code: "USD",
    name: "United States dollar",
    symbol: "$",
    flag: "https://flagcdn.com/us.svg",
    rate: 1,
    value: 0,
  },
};

export interface IConverionParams {
  value: number;
  rate: number;
}

export const baseCurrencySlice = createSlice({
  name: "baseCurrency",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<ICurrency>) => {
      const currency = action.payload;
      state.baseCurrency = currency;
    },
    selectedTobase: (state, action: PayloadAction<IConverionParams>) => {
      const value = action.payload.value;
      const rate = action.payload.rate;
      const converted = parseFloat((value / rate).toFixed(3));
      state.baseCurrency.value = converted;
    },
  },
  extraReducers: {},
});

export const { setCurrency, selectedTobase } = baseCurrencySlice.actions;
export const baseCurrency = (state: RootState) => state.baseCurrency;
export default baseCurrencySlice.reducer;
