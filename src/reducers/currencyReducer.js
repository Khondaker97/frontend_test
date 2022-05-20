import { GET_CURRENCIES, SELECTED_CURRENCY } from "../actions/type";

const initialState = {
  selected: "",
  currencies: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CURRENCIES:
      return { ...state, currencies: action.payload };
    case SELECTED_CURRENCY:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
}
