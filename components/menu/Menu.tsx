import classes from './Menu.module.css';
import MenuItem from './MenuItem';
import Filters from './Filters';
import { Item } from '@/model/Item';
import { useEffect, useState } from 'react';
import { CartItem } from '@/model/CartItem';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { addItem, removeItem } from '@/store/cart-slice';
import { showNotification } from '@/store/notification-slice';

type Props = {
  items: Item[];
  searchTerm: string;
};

let dataRetrieved = false;
let cartItem: CartItem | undefined;

export default function Menu(props: Props) {
  const cartCtx = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [prefrenceFilter, setPrefrenceFilter] = useState<string | null>();
  const [ratingsFilter, setRatingsFilter] = useState<string | null>();
  const { data: session } = useSession();

  //for retreving cart data
  useEffect(() => {
    const getCartItems = async () => {
      const res = await fetch(`/api/user?email=${session?.user?.email}`);
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
        if (cartCtx.length < 1 && cartItems?.length > 0 && !dataRetrieved) {
          cartItems.forEach((item) => dispatch(addItem(item)));
          dataRetrieved = true;
        }
      }
    };
    if (!dataRetrieved && session) getCartItems();
  }, [session]);

  //for updating cart data
  useEffect(() => {
    const addItemToDB = async () => {
      const res = await fetch('/api/user/update-cart', {
        method: 'PATCH',
        body: JSON.stringify({ cartItems: cartCtx }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!res.ok) {
        dispatch(removeItem(cartItem));
        dispatch(
          showNotification({
            type: 'failure',
            message: 'Unable to add item, try again after some time',
          })
        );
      }
    };
    if (cartItem) addItemToDB();
    cartItem = undefined;
  }, [cartCtx]);

  function onItemAdd(item: CartItem) {
    cartItem = item;
    dispatch(addItem(item));
  }

  const menu = props.items
    .filter((item) => {
      if (prefrenceFilter === 'veg') return item.veg === true;
      else if (prefrenceFilter === 'non-veg') return item.veg === false;
      else return true;
    })
    .filter((item) => {
      if (ratingsFilter) return item.avgRating! >= +ratingsFilter;
      else return true;
    })
    .filter((item) =>
      item.name
        .toLowerCase()
        // .concat(' ', item.description.toLowerCase())
        .includes(props.searchTerm.toLowerCase())
    )
    .map((item) => (
      <MenuItem
        key={item.id}
        item={item}
        onItemAdd={onItemAdd}
        qty={cartCtx.find((cartitem) => cartitem.id === item.id)?.quantity}
      />
    ));

  return (
    <>
      <Filters
        setPrefrenceFilter={setPrefrenceFilter}
        setRatingsFilter={setRatingsFilter}
      />
      <ol className={classes.menu}>{menu}</ol>
    </>
  );
}
