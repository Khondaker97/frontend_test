import { GET_CART_PRODUCTS, REMOVE_ITEM } from "./type";

export const getCartProducts = (product) => (dispatch) => {
  return dispatch({
    type: GET_CART_PRODUCTS,
    payload: product,
  });
};

export const removeProducts = (productId) => (dispatch) => {
  return dispatch({
    type: REMOVE_ITEM,
    payload: productId,
  });
};
