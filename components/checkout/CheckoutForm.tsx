import { useRouter } from 'next/router';
import classes from './CheckoutForm.module.css';
import { Address as AddressModel } from '@/model/Address';
import PriceDetails from '../cart/PriceDetails';
import Address from './Address';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/store/cart-context';
import { useSession } from 'next-auth/react';
import logo from '../../public/payment-logo.png';
import Order from '@/model/Order';

type Props = {
  addresses: AddressModel[];
};

let redirected = false;
let checkoutDone = false;

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
    //redirecting to cart if checkout page refreshed
    if (cartCtx.items.length < 1 && !redirected) {
      checkoutDone ? router.push('/orders') : router.push('/cart');
      redirected = true;
    }
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
    const razorpayOrder = await res.json();

    const options = {
      key: 'rzp_test_kh11tJtgOa1wTn',
      amount: amount * 100,
      currency: 'INR',
      name: 'Food Delivery',
      description: 'Test Transaction',
      order_id: razorpayOrder.id,

      //success handler function
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
        if (!res.ok) return;

        //redirect to success page after signature validation
        router.push('/success');

        //fetch payment details
        const paymentRes = await fetch(
          `/api/razorpay/payments?id=${response.razorpay_payment_id}`
        );
        if (!paymentRes.ok) return;
        const payment = await paymentRes.json();

        //create a new order instance if transaction successful
        const order = new Order(
          payment.email,
          cartCtx.items,
          selectedAddress!,
          amount,
          payment.method,
          { id: response.razorpay_payment_id, status: payment.status },
          payment.created_at,
          false,
          null
        );

        //add order to db
        const orderRes = await fetch('/api/order', {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
            'Content-type': 'application/json',
          },
        });
        if (!orderRes.ok) return;

        //reset the cart in frontend
        const oldCart = [...cartCtx.items];
        oldCart.forEach((item) => cartCtx.removeItem(item));

        //reset the cart in db
        const cartRes = await fetch('/api/user/update-cart', {
          method: 'PATCH',
          body: JSON.stringify({ cartItems: [] }),
          headers: {
            'Content-type': 'application/json',
          },
        });
        if (!cartRes.ok) return;

        checkoutDone = true;
        //router.push('/orders');
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
