import classes from './Loader.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};

export default function Loader({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return loading ? (
    <>
      <div className={classes.content}>
        <div className={classes.overlay}>
          <div className={classes.loader}></div>
        </div>
        <div>{children}</div>
      </div>
    </>
  ) : (
    children
  );
}
