import Link from 'next/link';
import successIcon from '../public/success.png';

export default function Success() {
  return (
    <div style={{ textAlign: 'center', marginTop: '15rem' }}>
      <img
        src={successIcon.src}
        alt="success-icon"
        style={{ height: '10rem' }}
      />
      <h1>Payment Successful!</h1>
      <Link href="/orders">Go to orders</Link>
    </div>
  );
}
