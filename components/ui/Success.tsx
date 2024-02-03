import Link from 'next/link';
import successIcon from '../../public/success.png';
import classes from './Success.module.css';
import Modal from './Modal';

export default function Success() {
  return (
    <Modal className={classes.success}>
      <img src={successIcon.src} alt="success-icon" />
      <h1>Payment Successful!</h1>
      <Link href="/orders">Go to orders</Link>
    </Modal>
  );
}
