import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Layout from "../../components/LandingPage/Layout/Layout";
import {
  Body1,
  Heading1,
  Heading2,
  Heading3,
} from "../../components/DS/Typography/Typography";
import Button from "../../components/DS/Button/Button";
import { ROUTES } from "../../Routes/Router";
import Input from "../../components/DS/Input/Input";
import landingPageIllustration from "../../assets/landingPage.png";
import styles from "./IndexPage.module.scss";
import { useHistory } from "react-router-dom";
import exampleRecipe from "./exampleRecipe.svg";

const IndexPage = () => {
  const history = useHistory();
  const [bookName, setBookname] = useState("");

  const toRegisterPage = (e) => {
    e.preventDefault();
    history.push({ pathname: ROUTES.REGISTER, state: { bookName } });
  };
  return (
    <Layout>
      <div className={styles.header}>
        <div>
          <Heading1>Samle alle favorittene på ett sted</Heading1>
          <Body1>
            Få slutt på endeløs leting etter oppskrifter bakerst i skuffen.
            Lagre alt fra bestemors kjøttkaker til matbloggerens ceviche i din
            personlige kokebok.
          </Body1>
          <br />
          <img src={landingPageIllustration} alt="Kokihop illustrasjon" />
          <form onSubmit={toRegisterPage}>
            <Input
              placeholder="Navn på boken"
              value={bookName}
              onChange={(e) => setBookname(e.target.value)}
            />
            <Button type="submit">Opprett en kokebok</Button>
          </form>
        </div>
      </div>
      <div className={styles.exampleRecipe}>
        <img src={exampleRecipe} alt="eksempel-oppskrift" />
      </div>
    </Layout>
  );
};

export default IndexPage;
