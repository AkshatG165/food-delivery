import { CartItem } from '@/model/CartItem';
import { AppDispatch } from './index';
import { showNotification } from './notification-slice';
import { addItem, removeItem } from './cart-slice';

export const getCartItems = (email: string) => {
  return async (dispatch: AppDispatch) => {
    const res = await fetch(`/api/user?email=${email}`);

    if (!res.ok)
      dispatch(
        showNotification({
          type: 'failure',
          message:
            'Unable to fetch cart items, please try again after some time',
        })
      );
    else {
      const cartItems: CartItem[] = (await res.json()).result[0]?.cartItems;
      cartItems.forEach((item) => dispatch(addItem(item)));
    }
  };
};

export const updateCartItems = (cartItems: CartItem[]) => {
  return async (dispatch: AppDispatch) => {
    const res = await fetch('/api/user/update-cart', {
      method: 'PATCH',
      body: JSON.stringify({ cartItems }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!res.ok) {
      dispatch(removeItem(cartItems[-1]));
      dispatch(
        showNotification({
          type: 'failure',
          message: 'Unable to add item, try again after some time',
        })
      );
    }
  };
};
