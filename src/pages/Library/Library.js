import { gql, useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heading3 } from "../../components/DS/Typography/Typography";
import Layout from "../../components/LandingPage/Layout/Layout";
import { AuthContext } from "../../context/authContext";

const Library = ({}) => {
  const { data, refetch } = useQuery(GET_BOOKS);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    refetch();
  }, [user]);

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
