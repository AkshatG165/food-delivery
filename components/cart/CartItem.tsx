import classes from './CartItem.module.css';
import { CartContext } from '@/store/cart-context';
import { useContext } from 'react';
import Card from '../ui/Card';
import { CartItem as CartItemModel } from '@/model/CartItem';

export default function CartItem({ item }: { item: CartItemModel }) {
  const cartCtx = useContext(CartContext);

  const handleAddItem = () => cartCtx.addItem(item);
  const handleRemoveItem = () => cartCtx.removeItem(item);

  return (
    <Card className={classes['cart-item']}>
      <div className={classes['cart-item-details']}>
        <p>{item.name}</p>
        <p>${item.price}</p>
      </div>
      <div className={classes['cart-item-actions']}>
        <button type="button" onClick={handleRemoveItem}>
          -
        </button>
        <p>{item.quantity}</p>
        <button type="button" onClick={handleAddItem}>
          +
        </button>
      </div>
    </Card>
  );
}
