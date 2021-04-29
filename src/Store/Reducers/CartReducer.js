import { ADD_TO_CART, REMOVE_FROM_CART } from "../Constant";

const cartInitialState = {
  cartItems: [],
};

export default CartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};
