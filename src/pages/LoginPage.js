import { gql, useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/DS/Button/Button";
import Input from "../components/DS/Input/Input";
import { Heading1 } from "../components/DS/Typography/Typography";
import Layout from "../components/LandingPage/Layout/Layout";
import { AuthContext } from "../context/authContext";
import useAuthForm from "../hooks/useAuthForm";
import ROUTES from "../Routes/Routes";

const LoginPage = () => {
  const history = useHistory();
  const context = useContext(AuthContext);

  const { userInput, errors, setErrors, onChange, onSubmit } = useAuthForm(
    loginCallback,
    {
      email: "",
      password: "",
    }
  );

  const [loginUser] = useMutation(LOGIN, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push(ROUTES.HOME);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: userInput,
  });

  function loginCallback() {
    loginUser();
  }

  return (
    <Layout>
      <form onSubmit={onSubmit}>
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
        <Button type="submit">Logg inn</Button>
      </form>

      <Button onClick={context.logout}>Logg ut</Button>
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
