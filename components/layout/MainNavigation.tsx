import classes from './MainNavigation.module.css';
import Link from 'next/link';
import logo from '../../public/logo.png';
import cartIcon from '../../public/cart-icon.png';
import searchIcon from '../../public/search-icon.png';

type Props = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function MainNavigation(props: Props) {
  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.setSearchTerm(e.target.value);

  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <Link href="/">
          <img src={logo.src} alt="FoodDeliveryLogo" />
        </Link>
        <form className={classes['search-form']}>
          <input
            type="text"
            placeholder="Search for items"
            onChange={handleOnSearch}
          />
          <img src={searchIcon.src} alt="search-icon" />
        </form>
        <ul className={classes.list}>
          <li>
            <Link href="/view-cart">
              <img src={cartIcon.src} alt="cart-icon" />
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
