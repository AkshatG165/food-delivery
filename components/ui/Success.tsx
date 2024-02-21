import Link from 'next/link';
import successIcon from '../../public/success.png';
import classes from './Success.module.css';
import Card from './Card';
import { useRouter } from 'next/router';

let redirectClasses = classes.success;

export default function Success() {
  const router = useRouter();

  const handleRedirect = () => {
    if (router.asPath === '/success')
      redirectClasses += ` ${classes['disable-animation']}`;
  };

  return (
    <div className={classes.backdrop}>
      <Card className={redirectClasses}>
        <img src={successIcon.src} alt="success-icon" />
        <h1>Order Placed Successfully!</h1>
        <Link href="/orders" onClick={handleRedirect}>
          Go to Orders
        </Link>
      </Card>
    </div>
  );
}
