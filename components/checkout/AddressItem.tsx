import Card from '../ui/Card';
import classes from './AddressItem.module.css';
import { Address } from '@/model/Address';
import AddressForm from '../address/AddressForm';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { showNotification } from '@/store/notification-slice';

type Props = {
  address: Address;
  selectedAddress: Address | undefined;
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address | undefined>>;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  addNew: boolean;
  setAddNew: React.Dispatch<React.SetStateAction<boolean>>;
  inProfile?: boolean;
};

export default function AddressItem({
  address,
  selectedAddress,
  setSelectedAddress,
  editing,
  setEditing,
  addNew,
  setAddNew,
  inProfile,
}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isChecked = selectedAddress
    ? selectedAddress.id === address.id
    : address.isDefault === true;

  const handleSelect = () => {
    setEditing(false);
    setAddNew(false);
    setSelectedAddress(address);
  };
  const handleEdit = () => {
    setSelectedAddress(address);
    setEditing(true);
  };
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this address?'))
      return;

    const res = await fetch('/api/user/delete-address', {
      method: 'PATCH',
      body: JSON.stringify({ id: address.id }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!res.ok) {
      const message = (await res.json()).message;
      dispatch(showNotification({ type: 'failure', message }));
    } else {
      dispatch(
        showNotification({
          type: 'success',
          message: 'Address deleted successfully!',
        })
      );
      router.push(router.asPath);
    }
  };

  return (
    <li>
      <Card className={classes['list-item']}>
        {/* hide radios if setSelectedAddress is not present (when using address component in profile section) */}
        {!inProfile && (
          <input
            type="radio"
            id={address.id}
            name="address"
            value={address.id}
            onChange={handleSelect}
            checked={isChecked}
          />
        )}
        {editing && isChecked ? (
          <AddressForm address={address} setEditing={setEditing} />
        ) : (
          <div className={classes.label}>
            <div className={classes.heading}>
              <div>
                <span>{address.name} - </span>
                <span>{address.mobile} </span>
                <span className={classes.title}>{address.title} </span>
              </div>
              <div>
                {/* show edit button for all if setSelectedAddress is not present (when using address component in profile section) */}
                {((selectedAddress && isChecked && !addNew) || inProfile) && (
                  <button className={classes['edit-btn']} onClick={handleEdit}>
                    Edit
                  </button>
                )}
                {inProfile && (
                  <button
                    className={classes['edit-btn']}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <div className={classes.body}>
              <span>{address.address}, </span>
              <span>{address.city}, </span>
              <span>{address.state} - </span>
              <span>{address.pincode}</span>
            </div>
          </div>
        )}
      </Card>
    </li>
  );
}
