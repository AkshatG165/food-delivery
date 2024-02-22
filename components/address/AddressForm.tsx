import classes from './AddressForm.module.css';
import { Address } from '@/model/Address';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '@/store/notification-slice';

type Props = {
  address?: Address;
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  addNew?: boolean;
  setAddNew?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddressForm({
  address,
  setEditing,
  addNew,
  setAddNew,
}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let url = '/api/user/update-address';
    const fd = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(fd.entries()),
      id: address?.id,
      isDefault: Object.fromEntries(fd.entries()).isDefault ? true : false,
      location: address?.location,
    };

    if (addNew) url = '/api/user/add-address';

    setIsLoading(true);
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    });
    setIsLoading(false);
    if (!res.ok) {
      addNew
        ? dispatch(
            showNotification({
              type: 'failure',
              message: 'Unable to add address',
            })
          )
        : dispatch(
            showNotification({
              type: 'failure',
              message: 'Unable to update address',
            })
          );
    } else {
      addNew
        ? dispatch(
            showNotification({
              type: 'success',
              message: 'Address added successfully!',
            })
          )
        : dispatch(
            showNotification({
              type: 'success',
              message: 'Address updated successfully!',
            })
          );
    }

    if (setEditing) setEditing(false);
    if (setAddNew) setAddNew(false);
    router.replace(router.asPath);
  }

  const handleCancel = () => {
    if (setEditing) setEditing(false);
    if (setAddNew) setAddNew(false);
  };

  return (
    <form className={classes['address-form']} onSubmit={handleSubmit}>
      <p>{addNew ? 'Add New Address' : 'Edit Address'}</p>
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
      {router.asPath !== '/checkout' && (
        <div className={classes.isDefault}>
          <input
            id="isDefault"
            type="checkbox"
            name="isDefault"
            defaultChecked={address?.isDefault}
          />
          <label>Mark as default</label>
        </div>
      )}
      <div className={classes['btns']}>
        <button disabled={isLoading}>{isLoading ? 'Saving..' : 'Save'}</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
