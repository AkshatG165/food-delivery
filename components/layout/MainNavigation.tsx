import classes from './MainNavigation.module.css';
import Link from 'next/link';
import logo from '../../public/logo.png';

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <Link href="/">
          <img src={logo.src} alt="FoodDeliveryLogo" />
        </Link>
        <ul className={classes.list}>
          <li>
            <Link href="/orders">Orders</Link>
          </li>
          <li>
            <Link href="/cart">Cart (3)</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}