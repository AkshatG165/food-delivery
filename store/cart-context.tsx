import { Reducer, createContext, useReducer } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Context = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
};

type Action = {
  type: string;
  payload: CartItem;
};

export const CartContext = createContext<Context>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

const CartReducer: Reducer<CartItem[], Action> = (
  state: CartItem[],
  action: Action
) => {
  if (action.type === 'ADD_ITEM') {
    if (
      state.length === 0 ||
      !state.some((item) => item.id === action.payload.id)
    )
      return [...state, action.payload];
    else {
      return state.map((item) => {
        if (item.id === action.payload.id)
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity + 1,
          };
        else return item;
      });
    }
  }
  if (action.type === 'REMOVE_ITEM') {
    return state
      .map((item) => {
        if (item.id === action.payload.id)
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity - 1,
          };
        else return item;
      })
      .filter((item) => item.quantity >= 1);
  }
  return state;
};

export function CartContextProvider(props: { children: React.ReactNode }) {
  const [items, dispatchItems] = useReducer(CartReducer, []);

  const addItem = (item: CartItem) =>
    dispatchItems({ type: 'ADD_ITEM', payload: item });
  const removeItem = (item: CartItem) =>
    dispatchItems({ type: 'REMOVE_ITEM', payload: item });

  return (
    <CartContext.Provider
      value={{ items: items, addItem: addItem, removeItem: removeItem }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
