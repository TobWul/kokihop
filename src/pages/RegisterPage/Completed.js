import { gql, useQuery } from "@apollo/client";
import React from "react";
import Button from "../../components/DS/Button/Button";
import { Body1, Heading1 } from "../../components/DS/Typography/Typography";
import Layout from "../../components/LandingPage/Layout/Layout";
import { ROUTES } from "../../Routes/Router";
import styles from "./Completed.module.scss";

const Completed = () => {
  const { data } = useQuery(GET_BOOKS);
  console.log(data);

  return (
    <Layout>
      <div className={styles.completed}>
        <Heading1>Vi tok ikke betalt, men boka di skal du få</Heading1>
        <Body1>
          Takk for at du viste interesse! Foreløpig er Kokihop i en tidlig fase,
          så denne boka skal du få gratis av oss. Det viktigste er at du kan
          komme i gang og lagre familieklenodiet på nett, så det aldri blir
          borte.
        </Body1>
        {data && data.getBooks && data.getBooks[0] ? (
          <Button to={`/bok/${data.getBooks[0].id}`}>Gå til boka di</Button>
        ) : (
          <>
            <Body1>
              Her har det skjedd noe feil, prøv å opprett boka på nytt
            </Body1>
            <Button to={ROUTES.REGISTER}>Opprett bok</Button>
          </>
        )}
      </div>
    </Layout>
  );
};

const GET_BOOKS = gql`
  query {
    getBooks {
      name
      id
      createdAt
    }
  }
`;

export default Completed;
