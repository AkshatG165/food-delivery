import classes from './Card.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card(props: Props) {
  const className = `${classes.card} ${props.className}`;
  return <div className={className}>{props.children}</div>;
}
