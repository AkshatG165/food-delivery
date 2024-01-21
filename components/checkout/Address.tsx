import classes from './Address.module.css';
import Card from '../ui/Card';
import AddressItem from './AddressItem';
import { Address as AddressModel } from '@/model/Address';
import { useState } from 'react';
import AddressForm from '../address/AddressForm';

type Props = {
  addresses: AddressModel[];
};

export default function Address({ addresses }: Props) {
  //setting initial state to the item id where isDefault is true
  let defaultAddress = '';
  if (addresses.length > 0) {
    defaultAddress =
      addresses?.filter((item) => item.isDefault === true).length > 0
        ? addresses?.filter((item) => item.isDefault === true)[0].id
        : addresses[0].id;
  }

  const [selected, setSelected] = useState(defaultAddress);
  const [editing, setEditing] = useState(false);
  const [addNew, setAddNew] = useState(false);

  const addressList = addresses?.map((item) => (
    <AddressItem
      key={item.id}
      address={item}
      selected={selected}
      setSelected={setSelected}
      editing={editing}
      setEditing={setEditing}
      addNew={addNew}
      setAddNew={setAddNew}
    />
  ));

  const newAddressForm = (
    <li>
      <Card className={classes['new-address']}>
        <input type="radio" name="address" defaultChecked />
        <AddressForm addNew={addNew} setAddNew={setAddNew} />
      </Card>
    </li>
  );

  const handleAddAddress = () => {
    setEditing(false);
    setAddNew(true);
  };
  const handleConfirm = () => setEditing(false);

  return (
    <Card className={classes['address-details']}>
      {addresses.length > 0 || addNew ? (
        <div className={classes.addresses}>
          <div>
            <h2>Address</h2>
            <ul className={classes['address-list']}>
              {addressList}
              {addNew && newAddressForm}
            </ul>
          </div>
          <div className={classes.buttons}>
            <button
              type="button"
              onClick={handleAddAddress}
              disabled={editing || addNew}
            >
              Add New
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={editing || addNew}
            >
              Confirm Address
            </button>
          </div>
        </div>
      ) : (
        <div className={classes.empty}>
          Add an address, for placing your first order!
          <button type="button" onClick={handleAddAddress} disabled={editing}>
            Add an address
          </button>
        </div>
      )}
    </Card>
  );
}
