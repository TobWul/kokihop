import { gql, useQuery } from "@apollo/client";
import React from "react";
import Layout from "../components/LandingPage/Layout/Layout";
import { Body1, Heading1 } from "../components/DS/Typography/Typography";
import Button from "../components/DS/Button/Button";
import { ROUTES } from "../Routes/Router";

const IndexPage = () => {
  return (
    <Layout>
      <Heading1>Kokihop</Heading1>
      <Body1>
        An online personal recipe book based on the magazine cutout book my mom
        and grandmothers had throughout my childhood.
      </Body1>
      <Button to={ROUTES.REGISTER}>Kjøp en kokebok</Button>
    </Layout>
  );
};

export default IndexPage;
