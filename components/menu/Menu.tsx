import classes from './Menu.module.css';
import MenuItem from './MenuItem';
import Filters from './Filters';
import { Item } from '@/model/Item';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/store/cart-context';
import { CartItem } from '@/model/CartItem';

type Props = {
  items: Item[];
  searchTerm: string;
};

let cartItem: CartItem | undefined;

export default function Menu(props: Props) {
  const [prefrenceFilter, setPrefrenceFilter] = useState<string | null>();
  const [ratingsFilter, setRatingsFilter] = useState<string | null>();
  const [error, setError] = useState('');
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const addItemToDB = async () => {
      const res = await fetch('/api/user/update-cart', {
        method: 'PATCH',
        body: JSON.stringify({ cartItems: cartCtx.items }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!res.ok) {
        cartCtx.removeItem(cartItem as CartItem);
        setError('Unable to add item, try again after some time.');
      }
    };
    if (cartItem) addItemToDB();
    cartItem = undefined;
  }, [cartCtx.items]);

  function onItemAdd(item: CartItem) {
    cartItem = item;
    cartCtx.addItem(item);
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
      <MenuItem key={item.id} item={item} onItemAdd={onItemAdd} />
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
