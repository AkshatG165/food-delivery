import classes from './Menu.module.css';
import Item from './MenuItem';
import AvailableItems from '../../public/available-items';

export default function Menu() {
  const menu = AvailableItems.map((item) => <Item key={item.id} item={item} />);
  return <ol className={classes.menu}>{menu}</ol>;
}
