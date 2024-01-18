import classes from './MenuItem.module.css';
import star from '../../public/star.png';
import { Item } from '../../model/Item';
import Card from '../ui/Card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CartItem } from '@/model/CartItem';

type Props = {
  item: Item;
  onItemAdd: (cartItem: CartItem) => void;
};

export default function MenuItem({ item, onItemAdd }: Props) {
  const { status } = useSession();
  const router = useRouter();
  const cartItem = new CartItem(item.id, item.name, item.price, 1);

  function handleClick() {
    if (status === 'unauthenticated') router.replace('/login');
    else onItemAdd(cartItem);
  }

  return (
    <Card className={classes.item}>
      <li key={item.id}>
        <div
          className={
            item.veg === true ? `${classes.dot} ${classes.green}` : classes.dot
          }
        />
        <div className={classes.rating}>
          <p>{item.rating}</p>
          <img src={star.src} alt="rating" />
        </div>
        <img src={item.image} alt={item.name} className={classes['item-img']} />
        <h3>{item.name}</h3>
        <p className={classes['item-price']}>${item.price}</p>
        <p className={classes['item-description']}>{item.description}</p>
        <button type="button" onClick={handleClick}>
          Add to Cart
        </button>
      </li>
    </Card>
  );
}
