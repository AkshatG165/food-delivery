import classes from './LoadingUI.module.css';

type Props = {
  children?: React.ReactNode;
};

export default function LoadingUI({ children }: Props) {
  return (
    <>
      <div className={classes.overlay}>
        <div className={classes.loader}></div>
      </div>
      <div>{children}</div>
    </>
  );
}
