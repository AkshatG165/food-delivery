import classes from './Modal.module.css';

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.backdrop}>
      <div className={classes.modal}>{children}</div>
    </div>
  );
}
