import React, { ReactNode } from 'react';
import classes from './RootLayout.module.css';
import MainNavigation from './MainNavigation';

type Props = {
  children: React.ReactNode;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function RootLayout(props: Props) {
  return (
    <>
      <MainNavigation setSearchTerm={props.setSearchTerm} />
      <main className={classes.main}>{props.children}</main>
      <script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
