import Card from '../ui/Card';
import classes from './AddressItem.module.css';
import { Address } from '@/model/Address';
import AddressForm from '../address/AddressForm';

type Props = {
  address: Address;
  selected: string;
  setSelected: (e: string) => void;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  addNew: boolean;
  setAddNew: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddressItem({
  address,
  selected,
  setSelected,
  editing,
  setEditing,
  addNew,
  setAddNew,
}: Props) {
  const isChecked = selected
    ? selected === address.id
    : address.isDefault === true;

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing(false);
    setAddNew(false);
    setSelected(e.currentTarget.id);
  };
  const handleEdit = () => setEditing(true);

  return (
    <li>
      <Card className={classes['list-item']}>
        <input
          type="radio"
          id={address.id}
          name="address"
          value={address.id}
          onChange={handleSelect}
          checked={isChecked}
        />
        {editing && isChecked ? (
          <AddressForm address={address} setEditing={setEditing} />
        ) : (
          <label className={classes.label}>
            <div className={classes.heading}>
              <div>
                <span>{address.name} - </span>
                <span>{address.mobile} </span>
                <span className={classes.title}>{address.title} </span>
              </div>
              {selected && isChecked && !addNew && (
                <button className={classes['edit-btn']} onClick={handleEdit}>
                  Edit
                </button>
              )}
            </div>
            <div className={classes.body}>
              <span>{address.address}, </span>
              <span>{address.city}, </span>
              <span>{address.state} - </span>
              <span>{address.pincode}</span>
            </div>
          </label>
        )}
      </Card>
    </li>
  );
}
