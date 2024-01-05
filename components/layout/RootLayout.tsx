import React, { ReactNode } from 'react';
import classes from './RootLayout.module.css';
import MainNavigation from './MainNavigation';

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = (props) => {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default RootLayout;
