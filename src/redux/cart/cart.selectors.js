import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart], //a collection of input selectors
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accummulatedQuantity, cartItem) =>
        accummulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems], 
  cartItems =>
  cartItems.reduce(
    (accummulatedQuantity, cartItem) =>
      accummulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
