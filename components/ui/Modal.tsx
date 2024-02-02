import classes from './Modal.module.css';

type Props = { children: React.ReactNode; className?: string };

export default function Modal({ children, className }: Props) {
  return (
    <div className={classes.backdrop}>
      <div className={classes.modal + ' ' + className}>{children}</div>
    </div>
  );
}
