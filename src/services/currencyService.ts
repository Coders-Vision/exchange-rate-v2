import axios from "axios";

export const latestCurrency = (currencyCode: string) =>
  axios.get(
    `${import.meta.env.VITE_APP_CURRENCY_URL}/latest?base=${currencyCode}`
  );
