import React, { useEffect } from 'react';
import classes from './RootLayout.module.css';
import MainNavigation from './MainNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import Notification from '../ui/Notification';
import { useDispatch } from 'react-redux';
import { getCartItems } from '@/store/cart-actions';
import { useSession } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

let dataRetrieved = false;

export default function RootLayout(props: Props) {
  const notification = useSelector(
    (state: RootState) => state.notification.notification
  );
  const dispatch = useDispatch();
  const { data: session } = useSession();

  //for retreving cart data
  useEffect(() => {
    if (!dataRetrieved && session) {
      dispatch(getCartItems(session.user?.email!) as any);
      dataRetrieved = true;
    }
  }, [session]);

  return (
    <>
      <MainNavigation setSearchTerm={props.setSearchTerm} />
      <main className={classes.main}>{props.children}</main>
      {notification.type && (
        <div className={classes.notification}>
          <Notification />
        </div>
      )}
      <script src="https://checkout.razorpay.com/v1/checkout.js" defer />
    </>
  );
}
