import { ADD_TO_CART } from "../Constant";

export default class CartAction {
  static addToCart(item) {
    return {
      type: ADD_TO_CART,
      payload: item,
    };
  }
}
