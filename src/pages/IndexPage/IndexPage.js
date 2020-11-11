import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Layout from "../../components/LandingPage/Layout/Layout";
import { Body1, Heading1 } from "../../components/DS/Typography/Typography";
import Button from "../../components/DS/Button/Button";
import { ROUTES } from "../../Routes/Router";
import Input from "../../components/DS/Input/Input";
import landingPageIllustration from "../../assets/landingPage.png";
import styles from "./IndexPage.module.scss";

const IndexPage = () => {
  const [bookName, setBookname] = useState("");

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
          <Input
            placeholder="Navn på boken"
            value={bookName}
            onChange={(e) => setBookname(e.target.value)}
          />
          <Button to={{ pathname: ROUTES.REGISTER, state: { bookName } }}>
            Opprett en kokebok
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
