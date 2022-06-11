import { configureStore } from "@reduxjs/toolkit";
import baseCurrencyReducer from "./baseCurrency/baseCurrencySlice";
import selectedCurrenciesReducer from "./selectedCurrencies/selectedCurrenciesSlice";
const store = configureStore({
  reducer: {
    baseCurrency: baseCurrencyReducer,
    selectedCurrencies: selectedCurrenciesReducer,
  },
  devTools: import.meta.env.DEV,
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
