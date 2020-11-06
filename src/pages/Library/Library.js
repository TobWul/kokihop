import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Heading3 } from "../../components/DS/Typography/Typography";
import Layout from "../../components/LandingPage/Layout/Layout";

const Library = ({}) => {
  const { data } = useQuery(GET_BOOKS);
  console.log(data);
  return (
    <Layout>
      {data &&
        data.getBooks.map(({ name, id }) => (
          <Link to={`/bok/${id}`} key={id}>
            <Heading3>{name}</Heading3>
          </Link>
        ))}
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

export default Library;
