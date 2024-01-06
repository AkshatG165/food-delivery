import classes from './Filters.module.css';

type Props = {
  setPrefrenceFilter: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  setRatingsFilter: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
};

export default function Filters({
  setPrefrenceFilter,
  setRatingsFilter,
}: Props) {
  const onPrefrenceFilter = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPrefrenceFilter((prev) => {
      if (
        (!prev && e.target.id === 'veg') ||
        (prev === 'both' && e.target.id === 'non-veg')
      )
        return 'veg';
      if (
        (!prev && e.target.id === 'non-veg') ||
        (prev === 'both' && e.target.id === 'veg')
      )
        return 'non-veg';
      if (
        (prev === 'veg' && e.target.id === 'veg') ||
        (prev === 'non-veg' && e.target.id === 'non-veg')
      )
        return null;
      if (
        (prev === 'veg' && e.target.id === 'non-veg') ||
        (prev === 'non-veg' && e.target.id === 'veg')
      )
        return 'both';
    });

  const onRatingFilter = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setRatingsFilter(e.target.value);

  return (
    <form className={classes.filter}>
      <div className={classes.prefrence}>
        <input
          type="checkbox"
          id="veg"
          name="veg"
          onChange={onPrefrenceFilter}
        />
        <label>Veg</label>
        <input
          type="checkbox"
          id="non-veg"
          name="non-veg"
          onChange={onPrefrenceFilter}
        />
        <label>Non-Veg</label>
      </div>
      <div className={classes.rating}>
        <label>Customer Rating</label>
        <select
          id="rating"
          name="rating"
          defaultValue="none"
          onChange={onRatingFilter}
        >
          <option value="none" disabled hidden>
            Select Rating
          </option>
          <option value="4">4 & Above</option>
          <option value="3">3 & Above</option>
          <option value="2">2 & Above</option>
          <option value="1">1 & Above</option>
        </select>
      </div>
    </form>
  );
}
