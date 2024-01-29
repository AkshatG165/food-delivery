import classes from './MainNavigation.module.css';
import Link from 'next/link';
import logo from '../../public/logo.png';
import cartIcon from '../../public/cart-icon.png';
import searchIcon from '../../public/search-icon.png';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import userIcon from '../../public/user.png';
import arrowIcon from '../../public/arrow.png';
import Card from '../ui/Card';

type Props = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function MainNavigation(props: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.setSearchTerm(e.target.value);
  async function handleLogout(e: React.MouseEvent) {
    e.preventDefault();
    await signOut({ redirect: true, callbackUrl: '/' });
  }

  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <Link href="/">
          <img src={logo.src} alt="FoodDeliveryLogo" />
        </Link>
        {router.asPath === '/' && (
          <form className={classes['search-form']}>
            <input
              type="text"
              placeholder="Search for items"
              onChange={handleSearch}
            />
            <img src={searchIcon.src} alt="search-icon" />
          </form>
        )}
        <ul className={classes.list}>
          <li>
            <Link href="/cart" className={classes.cart}>
              <img src={cartIcon.src} alt="cart-icon" />
              Cart
            </Link>
          </li>
          <li>
            {status === 'authenticated' ? (
              <div className={classes.dropdown}>
                <button className={classes.dropbtn}>
                  <img src={userIcon.src} alt="user-icon" />
                  {session.user?.name?.split(' ')[0]}
                  <img
                    src={arrowIcon.src}
                    alt="arrow-icon"
                    className={classes.arrow}
                  />
                </button>
                <Card className={classes['dropdown-content']}>
                  <Link href="/profile">Profile</Link>
                  <Link href="/orders">Orders</Link>
                  <Link href="" onClick={handleLogout}>
                    Logout
                  </Link>
                </Card>
              </div>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
