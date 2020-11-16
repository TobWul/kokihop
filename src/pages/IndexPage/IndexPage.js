import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Layout from "../../components/LandingPage/Layout/Layout";
import { Body1, Heading1 } from "../../components/DS/Typography/Typography";
import Button from "../../components/DS/Button/Button";
import { ROUTES } from "../../Routes/Router";
import Input from "../../components/DS/Input/Input";
import landingPageIllustration from "../../assets/landingPage.png";
import styles from "./IndexPage.module.scss";
import { useHistory } from "react-router-dom";

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
          <Heading1>Kokihop</Heading1>
          <Body1>
            An online personal recipe book based on the magazine cutout book my
            mom and grandmothers had throughout my childhood.
          </Body1>
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
    </Layout>
  );
};

export default IndexPage;
