import {
  FETCH_CATEGORY,
  GET_FILTERED_PRODUCTS,
  GET_PRODUCTS,
} from "../actions/type";

const initialState = {
  categories: [],
  filteredProducts: [],
  products: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY:
      return { ...state, categories: action.payload };
    case GET_FILTERED_PRODUCTS:
      return { ...state, filteredProducts: action.payload };
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}
