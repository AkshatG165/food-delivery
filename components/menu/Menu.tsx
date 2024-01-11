import classes from './Menu.module.css';
import MenuItem from './MenuItem';
import { useState } from 'react';
import Filters from './Filters';
import { Item } from '@/model/Item';

type Props = {
  items: Item[];
  searchTerm: string;
};

export default function Menu(props: Props) {
  const [prefrenceFilter, setPrefrenceFilter] = useState<string | null>();
  const [ratingsFilter, setRatingsFilter] = useState<string | null>();

  const menu = props.items
    .filter((item) => {
      if (prefrenceFilter === 'veg') return item.veg === true;
      else if (prefrenceFilter === 'non-veg') return item.veg === false;
      else return true;
    })
    .filter((item) => {
      if (ratingsFilter) return item.rating >= +ratingsFilter;
      else return true;
    })
    .filter((item) =>
      item.name
        .toLowerCase()
        // .concat(' ', item.description.toLowerCase())
        .includes(props.searchTerm.toLowerCase())
    )
    .map((item) => <MenuItem key={item.id} item={item} />);

  return (
    <>
      <Filters
        setPrefrenceFilter={setPrefrenceFilter}
        setRatingsFilter={setRatingsFilter}
      />
      <ol className={classes.menu}>{menu}</ol>
    </>
  );
}
