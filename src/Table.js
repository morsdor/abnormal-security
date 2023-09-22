import { useEffect, useState, Fragment } from "react";
import classes from "./Table.module.css";
import { constants } from "./constants";

export default function Table({ domainMap }) {
  const [domainStatsList, setdomainStatsList] = useState([]);

  useEffect(() => {

    //Once the domain mapping changes, create the list of each domain details
    if (domainMap) {
      const totalCount = [...domainMap.values()].reduce((acc, el) => acc + el);

      const domainList = [];
      for (let [key, value] of domainMap.entries()) {
        const obj = {
          domain: key,
          percentOfThreats: Math.floor((value / totalCount) * 100),
          numberOfThreats: value
        };

        domainList.push(obj);
      }

      setdomainStatsList(domainList.slice(0, 6));
    } else {
      setdomainStatsList([]);
    }
  }, [domainMap]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{constants.TABLE_HEADER} </div>
      <div className={classes.header}>
        <div>{constants.DOMAIN}</div>
        <div className={classes.end}>{constants.PERCENT_THREAT}</div>
        <div className={classes.end}>{constants.NUMBER_THREAT}</div>
      </div>

      <div className={classes["domain-container"]}>
        {domainStatsList.length > 0 &&
          domainStatsList.map((el) => {
            return (
              <Fragment key={el.domain}>
                <div>{el.domain}</div>
                <div className={classes.end}>{el.percentOfThreats}%</div>
                <div className={classes.end}>{el.numberOfThreats}</div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}
