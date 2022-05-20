import { GET_CART_PRODUCTS, REMOVE_ITEM } from "../actions/type";

const initialState = {
  carts: [],
};

const addToCart = (state, product) => {
  const newItem = [...state.carts];
  const currItemIndex = newItem.findIndex((i) => i.product.id === product.id);

  if (currItemIndex < 0) {
    newItem.push({ product, quantity: 1 });
  } else {
    const Item = { ...newItem[currItemIndex] };
    Item.quantity++;
    newItem[currItemIndex] = Item;
  }

  return { ...state, carts: newItem };
};

//remove a single product if needed
const removeItem = (state, productId) => {
  const cartItem = [...state.carts];
  const currItemIndex = cartItem.findIndex((i) => i.product.id === productId);

  if (currItemIndex >= 0) {
    const currItem = { ...cartItem[currItemIndex] };
    currItem.quantity--;

    if (currItem.quantity <= 0) {
      cartItem.splice(currItemIndex, 1);
    } else {
      cartItem[currItemIndex] = currItem;
    }
  }
  return { ...state, carts: cartItem };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return addToCart(state, action.payload);
    case REMOVE_ITEM:
      return removeItem(state, action.payload);
    default:
      return state;
  }
}
