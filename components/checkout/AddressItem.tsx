import Link from 'next/link';
import Card from '../ui/Card';
import classes from './AddressItem.module.css';
import { Address } from '@/model/Address';
import { useRouter } from 'next/router';

type Props = {
  address: Address;
  selected: string;
  setSelected: (e: string) => void;
};

export default function AddressItem({ address, selected, setSelected }: Props) {
  const router = useRouter();

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    setSelected(e.currentTarget.id);
  }

  return (
    <li>
      <Card className={classes['address-item']}>
        <input
          type="radio"
          id={address.id}
          name="address"
          value={address.id}
          onChange={handleSelect}
        />
        <label className={classes.label}>
          <div className={classes.heading}>
            <div>
              <span>{address.name} - </span>
              <span>{address.mobile} </span>
              <span className={classes.title}>{address.title} </span>
              {/* {address.isDefault && <span>Default</span>} */}
            </div>
            {(!router.query.editAddress ||
              router.query.editAddress === 'false') &&
              selected === address.id && (
                <Link href={`${window.location.href}&editAddress=true`}>
                  Edit
                </Link>
              )}
          </div>
          <div className={classes.body}>
            <span>{address.address}, </span>
            <span>{address.city}, </span>
            <span>{address.state} - </span>
            <span>{address.pincode}</span>
          </div>
        </label>
      </Card>
    </li>
  );
}
