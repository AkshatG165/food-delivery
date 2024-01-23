import { useRouter } from 'next/router';
import classes from './CheckoutForm.module.css';
import { Address as AddressModel } from '@/model/Address';
import PriceDetails from '../cart/PriceDetails';
import Address from './Address';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/store/cart-context';
import { useSession } from 'next-auth/react';
import logo from '../../public/payment-logo.png';

type Props = {
  addresses: AddressModel[];
};

export default function CheckoutForm({ addresses }: Props) {
  const [selectedAddress, setSelectedAddress] = useState<AddressModel>();
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  const { data: session } = useSession();

  let defaultAddress;
  if (addresses.length > 0)
    defaultAddress = addresses.find((item) => item.isDefault) || addresses[0];

  if (!selectedAddress) setSelectedAddress(defaultAddress);

  useEffect(() => {
    if (cartCtx.items.length < 1) router.replace('/view-cart');
  }, []);

  const cartTotal = cartCtx.items
    .map((item) => item.quantity * item.price)
    .reduce((total, currVal) => total + currVal, 0);

  async function handleCheckout(amount: number) {
    const res = await fetch('/api/razorpay/order', {
      method: 'POST',
      body: JSON.stringify({
        amount: amount * 100,
        currency: 'INR',
        receipt: Math.floor(Math.random() * Date.now() * 100).toString(),
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const order = await res.json();
    console.log(order);

    const options = {
      key: 'rzp_test_kh11tJtgOa1wTn',
      amount: amount * 100,
      currency: 'INR',
      name: 'Food Delivery',
      description: 'Test Transaction',
      order_id: order.id,
      handler: async function (response: any) {
        const res = await fetch('/api/razorpay/validate', {
          method: 'POST',
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
          headers: {
            'Content-type': 'application/json',
          },
        });
        if (res.ok) console.log(await res.json());
        else console.log(await res.json());
      },
      prefill: {
        name: selectedAddress?.name,
        email: session?.user?.email,
        contact: selectedAddress?.mobile,
      },
      image: logo.src,
      theme: {
        color: '#ffc404',
      },
    };

    var razorpay = new (window as any).Razorpay(options);
    razorpay.open();
    razorpay.on('payment.failed', function (response: any) {
      console.log(
        response.error.code,
        response.error.description,
        response.error.source,
        response.error.step,
        response.error.reason,
        response.error.metadata.order_id,
        response.error.metadata.payment_id
      );
    });
  }

  return (
    <div className={classes['checkout-page']}>
      <div className={classes['confirm-details']}>
        <Address
          addresses={addresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      </div>
      <PriceDetails cartTotal={cartTotal} handleCheckout={handleCheckout} />
    </div>
  );
}
