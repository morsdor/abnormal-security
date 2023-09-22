import { useEffect, useState } from "react";
import "./styles.css";
import classes from "./App.module.css";
import Card from "./Card";
import { constants } from "./constants";
import Table from "./Table";

export default function App() {
  const [customerList, setCustomerList] = useState([]);
  const [, setSelectedCustomer] = useState("");
  const [highSeverityAttackCount, setHighSeverityAttackCount] = useState(0);
  const [spamAttackCount, setSpamAttackCount] = useState(0);
  const [domainMap, setDomainMap] = useState();

  useEffect(() => {

    //fetch all the customers list
    async function fetchCustomerList() {
      try {
        const res = await fetch(
          "https://abnormalsecurity-public.s3.amazonaws.com/fe_dashboard/customers.json"
        );

        if (!res.ok) {
          throw new Error("Error getting customer data");
        }

        const data = await res.json();
        setCustomerList(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchCustomerList();
  }, []);

  async function setIndividualCustomerDetails(customerId) {
    try {

      //Get the individual customer details
      const res = await fetch(`https://abnormalsecurity-public.s3.amazonaws.com/fe_dashboard/${customerId}/messages.json
        `);

      if (!res.ok) {
        throw new Error("Details not found");
      }

      const customerDetailsArray = await res.json();

      //store the attack score count and attack count if attack type is SPAM
      const attackDetails = customerDetailsArray.reduce(
        (acc, el) => {
          if (el.attackScore > 0.7) {
            acc.attackCount++;
          }
          if (el.attackType === "SPAM") {
            acc.spamCount++;
          }
          return acc;
        },
        { attackCount: 0, spamCount: 0 }
      );

      const map = new Map();

      //store the count of each domain in the map
      customerDetailsArray.forEach((el) => {
        const domain = el.from.split("@")[1];

        if (!map.has(domain)) {
          map.set(domain, 1);
        } else {
          map.set(domain, map.get(domain) + 1);
        }
      });

      //set state variables for each customer, attack count and spam count
      setSelectedCustomer(customerId);
      setHighSeverityAttackCount(attackDetails.attackCount);
      setSpamAttackCount(attackDetails.spamCount);
      setDomainMap(map);
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleDropdownChange(e) {
    const cus = e.target.value;

    //if the first option is selected, reset the values
    if (cus === "defaultValue") {
      setSelectedCustomer("");
      setHighSeverityAttackCount(0);
      setSpamAttackCount(0);
      setDomainMap(undefined);
    } else {
      setIndividualCustomerDetails(cus);
    }
  }

  return (
    <div className={classes.container}>
      <div>
        <p>Customer :</p>
        <select onChange={handleDropdownChange}>
          <option value="defaultValue">please select</option>
          {customerList.map((cus) => {
            return (
              <option key={cus.id} value={cus.id}>
                {cus.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={classes["card-container"]}>
        <Card value={highSeverityAttackCount} label={constants.HIGH_SEVERITY} />
        <Card value={spamAttackCount} label={constants.SPAM} />
      </div>
      <Table domainMap={domainMap} />
    </div>
  );
}
