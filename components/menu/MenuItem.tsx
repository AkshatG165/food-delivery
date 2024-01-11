import classes from './MenuItem.module.css';
import star from '../../public/star.png';
import { Item } from '../../model/Item';
import Card from '../ui/Card';
import { useContext } from 'react';
import { CartContext } from '@/store/cart-context';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type Props = {
  item: Item;
};

export default function MenuItem({ item }: Props) {
  const { status } = useSession();
  const cartCtx = useContext(CartContext);
  const router = useRouter();

  function handleClick() {
    if (status === 'unauthenticated') router.replace('/login');
    cartCtx.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
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
