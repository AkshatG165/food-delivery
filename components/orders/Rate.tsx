import ReactStars from 'react-stars';
import Modal from '../ui/Modal';
import classes from './Rate.module.css';
import Order from '@/model/Order';
import { useEffect, useState } from 'react';
import { Item } from '@/model/Item';

type Props = {
  order: Order;
  setShowRate: React.Dispatch<React.SetStateAction<boolean>>;
};
type Rating = {
  orderId: string;
  itemName: string;
  rating: number;
};

export default function Rate({ order, setShowRate }: Props) {
  const [oldRatings, setOldRatings] = useState<Rating[]>([]);
  const ratings: Rating[] = order.items.map((item) => ({
    orderId: order.id!,
    itemName: item.name,
    rating: 0,
  }));

  const handleCancel = () => setShowRate(false);
  const handleRating = (itemName: string, newRating: number) => {
    ratings.forEach((rating) => {
      if (rating.itemName === itemName) rating.rating = newRating;
    });
  };
  const handleSubmit = async () => {
    const url =
      oldRatings.length > 0
        ? '/api/item/update-rating'
        : '/api/item/add-rating';

    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(ratings),
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!res.ok) return;
    setShowRate(false);
  };

  useEffect(() => {
    const fetchRatings = async () => {
      const res = await fetch(`/api/item?orderId=${order.id}`);
      if (!res.ok) return;
      const items = (await res.json()).result;

      if (items.length > 0) {
        items.forEach((item: Item) => {
          item.ratings?.forEach((rating) => {
            if (rating.orderId === order.id) {
              setOldRatings((prev) => [
                ...prev,
                {
                  orderId: rating.orderId,
                  itemName: item.name,
                  rating: rating.rating,
                },
              ]);
            }
          });
        });
      }
    };
    fetchRatings();
  }, []);

  const rateItems = order.items.map((item) => (
    <li key={item.id} className={classes['rate-item']}>
      <span className={classes.name}>{item.name}: </span>
      <span>
        <ReactStars
          count={5}
          size={40}
          color2="#ffc404"
          onChange={(newRating: number) => handleRating(item.name, newRating)}
          value={
            oldRatings.length > 0
              ? oldRatings.filter((rating) => rating.itemName === item.name)[0]
                  .rating
              : undefined
          }
        />
      </span>
    </li>
  ));

  return (
    <Modal>
      <ul>{rateItems}</ul>
      <div className={classes.btns}>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </Modal>
  );
}
