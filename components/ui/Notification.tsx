import classes from './Notification.module.css';
import Card from './Card';
import React, { useEffect, useState } from 'react';

type Props = {
  type?: string;
  message?: string;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Notification({
  type,
  message,
  setShowNotification,
}: Props) {
  const timer = 300000;
  const [progress, setProgress] = useState(timer);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (progress <= 0) {
      setShowNotification(false);
      return;
    }
    if (isPaused) return;
    const interval = setInterval(() => setProgress((prev) => prev - 10), 10);
    return () => clearInterval(interval);
  }, [progress, isPaused]);

  const handleClose = () => setShowNotification(false);
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className={classes.backdrop}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Card
          className={`${classes.notification} ${
            type === 'success' ? classes.success : classes.failure
          }`}
        >
          <button type="button" onClick={handleClose}>
            x
          </button>
          <p>{message}</p>
          <progress value={timer - progress} max={timer} />
        </Card>
      </div>
    </div>
  );
}
