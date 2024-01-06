import classes from './MenuItem.module.css';
import star from '../../public/star.png';
import Item from '../../model/Item';

type Props = {
  item: Item;
};

const MenuItem: React.FC<Props> = ({ item }) => {
  return (
    <li className={classes.item} key={item.id}>
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
      <button type="button">Add to Cart</button>
    </li>
  );
};

export default MenuItem;
