import { useRouter } from 'next/router';
import classes from './AddressForm.module.css';
import Link from 'next/link';
import { Address } from '@/model/Address';

type Props = {
  address: Address | undefined;
};

export default function AddressForm({ address }: Props) {
  const router = useRouter();

  return (
    <form className={classes['address-form']}>
      <p>Edit Address</p>
      <div className={classes.row}>
        <div>
          <label>Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter name"
            defaultValue={address?.name}
          />
        </div>
        <div>
          <label>Address Type</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter title"
            defaultValue={address?.title}
          />
        </div>
      </div>
      <div className={classes.row}>
        <div>
          <label>Mobile Number</label>
          <input
            id="mobile"
            type="number"
            name="mobile"
            placeholder="Enter 10-digit number"
            defaultValue={address?.mobile}
          />
        </div>
        <div>
          <label>Pincode</label>
          <input
            id="pincode"
            type="number"
            name="pincode"
            placeholder="Enter pincode"
            defaultValue={address?.pincode}
          />
        </div>
      </div>
      <div className={classes['address-group']}>
        <label>Address</label>
        <textarea
          id="address"
          name="address"
          placeholder="Enter full address"
          defaultValue={address?.address}
        />
      </div>
      <div className={classes.row}>
        <div>
          <label>City</label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="Enter city"
            defaultValue={address?.city}
          />
        </div>
        <div>
          <label>State</label>
          <input
            id="state"
            type="text"
            name="state"
            placeholder="Enter state"
            defaultValue={address?.state}
          />
        </div>
      </div>
      <div className={classes['button-link']}>
        <button>Save</button>
        <Link href={`${router.asPath.split('&')[0]}&editAddress=false`}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
