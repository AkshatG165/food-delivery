import classes from './Menu.module.css';
import MenuItem from './MenuItem';
import Filters from './Filters';
import { Item } from '@/model/Item';
import { useEffect, useState } from 'react';
import { CartItem } from '@/model/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { addItem } from '@/store/cart-slice';
import { updateCartItems } from '@/store/cart-actions';

type Props = {
  items: Item[];
  searchTerm: string;
};

let cartItem: CartItem | undefined;

export default function Menu(props: Props) {
  const cartCtx = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [prefrenceFilter, setPrefrenceFilter] = useState<string | null>();
  const [ratingsFilter, setRatingsFilter] = useState<string | null>();

  //for updating cart data
  useEffect(() => {
    if (cartItem) dispatch(updateCartItems(cartCtx) as any);
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
