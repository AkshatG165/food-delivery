import classes from './Notification.module.css';
import Card from './Card';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { hideNotification } from '@/store/notification-slice';

export default function Notification() {
  const notification = useSelector(
    (state: RootState) => state.notification.notification
  );
  const dispatch = useDispatch();

  const timer = 5000;
  const [progress, setProgress] = useState(timer);
  const [isPaused, setIsPaused] = useState(false);

  //reset timer if new notification comes
  useEffect(() => {
    setProgress(timer);
  }, [notification.message]);

  useEffect(() => {
    if (progress <= 0) {
      dispatch(hideNotification());
      return;
    }
    if (isPaused) return;
    const interval = setInterval(() => setProgress((prev) => prev - 10), 10);
    return () => clearInterval(interval);
  }, [progress, isPaused]);

  const handleClose = () => dispatch(hideNotification());
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      className={classes.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className={`${classes.notification} ${
          notification.type === 'success' ? classes.success : classes.failure
        }`}
      >
        <button type="button" onClick={handleClose}>
          x
        </button>
        <p>{notification.message}</p>
        <progress value={timer - progress} max={timer} />
      </Card>
    </div>
  );
}
