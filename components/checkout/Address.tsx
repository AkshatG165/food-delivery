import classes from './Address.module.css';
import Card from '../ui/Card';
import AddressItem from './AddressItem';
import { Address as AddressModel } from '@/model/Address';
import { useState } from 'react';
import AddressForm from '../address/AddressForm';

type Props = {
  addresses: AddressModel[];
  selectedAddress: AddressModel | undefined;
  setSelectedAddress: React.Dispatch<
    React.SetStateAction<AddressModel | undefined>
  >;
};

export default function Address({
  addresses,
  selectedAddress,
  setSelectedAddress,
}: Props) {
  //setting initial state to the address where isDefault is true
  const [editing, setEditing] = useState(false);
  const [addNew, setAddNew] = useState(false);

  const addressList = addresses?.map((item) => (
    <AddressItem
      key={item.id}
      address={item}
      selectedAddress={selectedAddress}
      setSelectedAddress={setSelectedAddress}
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
