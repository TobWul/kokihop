import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../components/DS/Button/Button";
import Input from "../../components/DS/Input/Input";
import { Heading1 } from "../../components/DS/Typography/Typography";
import Layout from "../../components/LandingPage/Layout/Layout";
import { AuthContext } from "../../context/authContext";
import useAuthForm from "../../hooks/useAuthForm";
import { ROUTES } from "../../Routes/Router";
import styles from "./LoginPage.module.scss";

const LoginPage = (props) => {
  const location = useLocation();
  const history = useHistory();
  const context = useContext(AuthContext);

  useEffect(() => {
    context.user !== null && history.push(ROUTES.HOME);
  });

  const { userInput, errors, setErrors, onChange, onSubmit } = useAuthForm(
    loginCallback,
    {
      email: "",
      password: "",
    }
  );

  const [loginUser, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN,
    {
      update(_, { data: { login: userData } }) {
        context.login(userData);
        history.push(location.state.from ? location.state.from : ROUTES.HOME);
      },
      onError(err) {
        err.graphQLErrors[0] &&
          setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
      variables: userInput,
    }
  );

  function loginCallback() {
    loginUser();
  }

  return (
    <Layout>
      <form onSubmit={onSubmit} className={styles.loginWrapper}>
        <Heading1>Logg inn</Heading1>
        <Input
          name="email"
          placeholder="E-post"
          value={userInput.email}
          errorMessage={errors.email}
          onChange={onChange}
        />
        <Input
          name="password"
          placeholder="Passord"
          value={userInput.password}
          errorMessage={errors.password}
          type="password"
          onChange={onChange}
        />
        {errors.general && <p>{errors.general}</p>}
        <Button loading={loginLoading} type="submit">
          Logg inn
        </Button>
      </form>
    </Layout>
  );
};

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      token
    }
  }
`;

export default LoginPage;
