import { GET_CURRENCIES, SELECTED_CURRENCY } from "./type";
import { GET_CURRENCIES_QUERY } from "../query/graphql";

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_CURRENCIES_QUERY,
      }),
    });

    const result = await response.json();
    return dispatch({ type: GET_CURRENCIES, payload: result.data.currencies });
  } catch (error) {
    console.log(error);
  }
};

export const selectedCurr = (label) => (dispatch) => {
  return dispatch({
    type: SELECTED_CURRENCY,
    payload: label,
  });
};
