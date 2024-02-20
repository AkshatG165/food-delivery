import React from 'react';
import classes from './RootLayout.module.css';
import MainNavigation from './MainNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import Notification from '../ui/Notification';

type Props = {
  children: React.ReactNode;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function RootLayout(props: Props) {
  const notification = useSelector(
    (state: RootState) => state.notification.notification
  );

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
