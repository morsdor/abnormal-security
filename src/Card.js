import classes from "./Card.module.css";
import { constants } from "./constants";

export default function Card({ label, value }) {
  const cardValueColor = label === constants.SPAM ? "orange" : "red";

  return (
    <div className={classes.container}>
      <div className={`${classes.counter}  ${classes[cardValueColor]}`}>
        {value}
      </div>
      <div className={classes.label}>{label}</div>
    </div>
  );
}
