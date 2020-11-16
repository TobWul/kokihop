import React, { useState } from "react";
import { cn } from "../../../lib/helpers";
import { Body2, Subtitle1, Subtitle2 } from "../../DS/Typography/Typography";
import styles from "./PaymentMethods.module.scss";
import cardLogos from "./card.svg";
import vippsLogo from "./vipps.svg";

const Radio = ({ selected, onClick }) => (
  <div
    onClick={onClick}
    className={cn(styles.radio, selected ? styles.selected : "")}
  />
);

const PaymentMethods = () => {
  const [selectedPaymentMethods, setSelectedPaymentMethod] = useState(0);
  return (
    <div className={styles.container}>
      <div
        className={styles.paymentItem}
        onClick={() => setSelectedPaymentMethod(0)}
      >
        <Radio selected={selectedPaymentMethods === 0} />
        <div>
          <Subtitle2>Kort</Subtitle2>
          <Body2>Betal med kort</Body2>
        </div>
        <img src={cardLogos} alt="Visa + Mastercard" />
      </div>
      <div
        className={styles.paymentItem}
        onClick={() => setSelectedPaymentMethod(1)}
      >
        <Radio selected={selectedPaymentMethods === 1} />
        <div>
          <Subtitle2>Vipps</Subtitle2>
          <Body2>Betal fra mobil</Body2>
        </div>
        <img src={vippsLogo} alt="Vippslogo" />
      </div>
    </div>
  );
};

export default PaymentMethods;
