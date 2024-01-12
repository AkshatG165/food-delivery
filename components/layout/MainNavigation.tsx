import classes from './MainNavigation.module.css';
import Link from 'next/link';
import logo from '../../public/logo.png';
import cartIcon from '../../public/cart-icon.png';
import searchIcon from '../../public/search-icon.png';
import { signOut, useSession } from 'next-auth/react';
import { useContext } from 'react';
import { CartContext } from '@/store/cart-context';

type Props = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function MainNavigation(props: Props) {
  const { status } = useSession();
  const cartCtx = useContext(CartContext);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.setSearchTerm(e.target.value);
  const handleLogout = async () => {
    const res = await fetch('/api/user', {
      method: 'PATCH',
      body: JSON.stringify({ cartItems: cartCtx.items }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    await signOut({ redirect: true, callbackUrl: '/' });
  };

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
            onChange={handleSearch}
          />
          <img src={searchIcon.src} alt="search-icon" />
        </form>
        <ul className={classes.list}>
          <li>
            <Link href="/view-cart" className={classes.cart}>
              <img src={cartIcon.src} alt="cart-icon" />
              Cart
            </Link>
          </li>
          <li>
            {status === 'authenticated' ? (
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
