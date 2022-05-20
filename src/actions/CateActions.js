import { FETCH_CATEGORY, GET_FILTERED_PRODUCTS, GET_PRODUCTS } from "./type";
import { GET_CATEGORIES, ALL_PRODUCTS } from "../query/graphql";

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_CATEGORIES,
      }),
    });
    const result = await response.json();
    return dispatch({
      type: FETCH_CATEGORY,
      payload: result.data.categories,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: ALL_PRODUCTS,
      }),
    });
    const result = await response.json();
    return dispatch({
      type: GET_PRODUCTS,
      payload: result.data.category.products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredProducts = (name) => (dispatch) => {
  return dispatch({
    type: GET_FILTERED_PRODUCTS,
    payload: name.products,
  });
};
