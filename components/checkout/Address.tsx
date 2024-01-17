import classes from './Address.module.css';
import Card from '../ui/Card';
import AddressItem from './AddressItem';
import { Address as AddressModel } from '@/model/Address';
import { useState } from 'react';

type Props = {
  addresses: AddressModel[] | undefined;
};

export default function Address({ addresses }: Props) {
  const [selected, setSelected] = useState('');

  const addressList = addresses?.map((item) => (
    <AddressItem
      key={item.id}
      address={item}
      selected={selected}
      setSelected={setSelected}
    />
  ));

  return (
    <Card className={classes['address-details']}>
      <div className={classes.addresses}>
        <div>
          <h2>Address</h2>
          <ul className={classes['address-list']}>{addressList}</ul>
        </div>
        <div>
          <button type="button">Add New</button>
          <button type="button">Confirm Address</button>
        </div>
      </div>
    </Card>
  );
}
