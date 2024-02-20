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
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

type Props = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function MainNavigation(props: Props) {
  const cartCtx = useSelector((state: RootState) => state.cart.cart);
  const [runEffect, setRunEffect] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (cartCtx.length === 0) return;
    setRunEffect(true);
    const timer = setTimeout(() => setRunEffect(false), 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.setSearchTerm(e.target.value);
  async function handleLogout(e: React.MouseEvent) {
    e.preventDefault();
    await signOut({ redirect: true, callbackUrl: '/' });
  }

  return (
    <header className={classes.header}>
      <nav
        className={
          classes.navbar +
          ` ${router.asPath.includes('/login') && classes.center}`
        }
      >
        <Link href="/">
          <img src={logo.src} alt="FoodDeliveryLogo" />
        </Link>
        {router.asPath === '/' && (
          <div className={classes['search-bar']}>
            <input
              type="text"
              placeholder="Search for items"
              onChange={handleSearch}
            />
            <img src={searchIcon.src} alt="search-icon" />
          </div>
        )}
        {/* dont show cart & login when on login page */}
        {!router.asPath.includes('/login') && (
          <ul className={classes.list}>
            <li className={classes.cart}>
              {/* show cart only if user is logged in */}
              {status === 'authenticated' && (
                <Link href="/cart">
                  <img src={cartIcon.src} alt="cart-icon" />
                  Cart
                  {cartCtx.length > 0 && (
                    <div
                      className={`${classes['total-quantity']} ${
                        runEffect ? classes.pop : ''
                      }`}
                    >
                      {cartCtx
                        .map((item) => item.quantity)
                        .reduce((total, currVal) => total + currVal, 0)}
                    </div>
                  )}
                </Link>
              )}
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
        )}
      </nav>
    </header>
  );
}
