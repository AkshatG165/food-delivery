import classes from './CartItem.module.css';
import Card from '../ui/Card';
import { CartItem as CartItemModel } from '@/model/CartItem';

type Props = {
  item: CartItemModel;
  onItemAdd: (cartItem: CartItemModel) => void;
  onItemRemove: (cartItem: CartItemModel) => void;
};

export default function CartItem({ item, onItemAdd, onItemRemove }: Props) {
  return (
    <Card className={classes['cart-item']}>
      <div className={classes['cart-item-details']}>
        <p>{item.name}</p>
        <p>${item.price}</p>
      </div>
      <div className={classes['cart-item-actions']}>
        <button type="button" onClick={() => onItemRemove(item)}>
          -
        </button>
        <p>{item.quantity}</p>
        <button type="button" onClick={() => onItemAdd(item)}>
          +
        </button>
      </div>
    </Card>
  );
}
