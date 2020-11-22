import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import Input from "../../components/DS/Input/Input";
import Button from "../../components/DS/Button/Button";
import Layout from "../../components/LandingPage/Layout/Layout";
import { useHistory, useLocation } from "react-router-dom";
import useAuthForm from "../../hooks/useAuthForm";
import { AuthContext } from "../../context/authContext";
import { ROUTES } from "../../Routes/Router";
import {
  Body1,
  Body2,
  Heading1,
  Subtitle1,
} from "../../components/DS/Typography/Typography";
import PaymentMethods from "../../components/LandingPage/PaymentMethods/PaymentMethods";
import styles from "./RegisterPage.module.scss";
import DummyBook from "../../components/LandingPage/DummyBook/DummyBook";
import { failSafeGraphQlError } from "../../lib/helpers";

const RegisterPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { login, user } = useContext(AuthContext);
  const {
    userInput,
    errors,
    paymentMethod,
    onChange,
    onSubmit,
    setErrors,
    setPaymentMethod,
  } = useAuthForm(registerCallback, {
    name: "",
    bookName: (location.state && location.state.bookName) || "",
    email: "",
    password: "",
    paymentMethod: 0,
  });

  const [
    createNewUser,
    { loading: createUserLoading, error: createUserError },
  ] = useMutation(CREATE_USER, {
    update(_, { data: { register: userData } }) {
      console.log("Updated createNewUser");
      login(userData);
      history.push(ROUTES.FAKE_DOOR, { bookId: userData.bookId });
    },
    onError(err) {
      setErrors(failSafeGraphQlError(err));
    },
    variables: { ...userInput, paymentMethod },
  });
  const [createNewBook] = useMutation(CREATE_NEW_BOOK, {
    update(
      _,
      {
        data: {
          newBook: { id },
        },
      }
    ) {
      history.push(ROUTES.FAKE_DOOR, { bookId: id });
    },
    onCompleted: () => {},
    onError(err) {
      setErrors(failSafeGraphQlError(err));
    },
    variables: { name: userInput.bookName },
  });

  function registerCallback() {
    if (userInput.bookName.trim() === "") {
      setErrors({ ...errors, bookName: "Boken må ha et navn" });
    } else {
      user ? createNewBook() : createNewUser();
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.inputFields}>
          <Heading1>{user ? `Hei igjen!` : "Ny bruker"}</Heading1>
          <Body1>
            {user
              ? "Trenger du påfyll til biblioteket?"
              : "Begynn med én bok, når den er skrevet ut, kan du kjøpe flere bøker å legge i samlingen din."}
          </Body1>
          <br />
          <form onSubmit={onSubmit}>
            <Input
              id="register-book-name"
              placeholder="Boknavn"
              name="bookName"
              errorMessage={errors && errors.bookName}
              value={userInput.bookName}
              onChange={onChange}
            />
            {!user && (
              <>
                <Input
                  id="register-name"
                  placeholder="Navn"
                  name="name"
                  errorMessage={errors && errors.name}
                  value={userInput.name}
                  onChange={onChange}
                />
                <Input
                  id="register-email"
                  placeholder="E-post"
                  name="email"
                  errorMessage={errors && errors.email}
                  value={userInput.email}
                  onChange={onChange}
                />
                <Input
                  id="register-password"
                  placeholder="Nytt passord"
                  name="password"
                  errorMessage={errors && errors.password}
                  value={userInput.password}
                  type="password"
                  autoComplete="new-password"
                  onChange={onChange}
                />
              </>
            )}
            <Body1>Velg betalingsmåte</Body1>
            <PaymentMethods
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
            <br />
            <Subtitle1>kr 49</Subtitle1>
            <br />
            <Button loading={createUserLoading} type="submit">
              Gå til betaling
            </Button>
          </form>
        </div>
        <DummyBook bookName={userInput.bookName} />
      </div>
    </Layout>
  );
};

const CREATE_USER = gql`
  mutation CreateNewUser(
    $name: String!
    $email: String!
    $password: String!
    $bookName: String!
    $paymentMethod: Int!
  ) {
    register(
      registerInput: {
        name: $name
        email: $email
        password: $password
        bookName: $bookName
        paymentMethod: $paymentMethod
      }
    ) {
      id
      name
      email
      token
      createdAt
      bookId
    }
  }
`;
const CREATE_NEW_BOOK = gql`
  mutation CreateNewBook($name: String!) {
    newBook(name: $name) {
      id
    }
  }
`;

export default RegisterPage;
