import classes from './Menu.module.css';
import Item from './MenuItem';
import AvailableItems from '../../public/available-items';
import { useState } from 'react';
import Filters from './Filters';

export default function Menu() {
  const [prefrenceFilter, setPrefrenceFilter] = useState<string | null>();
  const [ratingsFilter, setRatingsFilter] = useState<string | null>();

  const menu = AvailableItems.filter((item) => {
    if (prefrenceFilter === 'veg') return item.veg === true;
    else if (prefrenceFilter === 'non-veg') return item.veg === false;
    else return true;
  })
    .filter((item) => {
      if (ratingsFilter) return item.rating >= +ratingsFilter;
      else return true;
    })
    .map((item) => <Item key={item.id} item={item} />);

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
