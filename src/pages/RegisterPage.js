import { gql, useMutation } from "@apollo/client";
import React, { useContext } from "react";
import Input from "../components/DS/Input/Input";
import Button from "../components/DS/Button/Button";
import Layout from "../components/LandingPage/Layout/Layout";
import { useHistory } from "react-router-dom";
import ROUTES from "../Routes/Routes";
import useAuthForm from "../hooks/useAuthForm";
import { AuthContext } from "../context/authContext";

const RegisterPage = () => {
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const { userInput, errors, onChange, onSubmit, setErrors } = useAuthForm(
    registerCallback,
    {
      name: "",
      email: "",
      password: "",
    }
  );

  const [createNewUser] = useMutation(CREATE_USER, {
    update(_, { data: { register: userData } }) {
      login(userData);
      history.push(ROUTES.HOME);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: userInput,
  });

  function registerCallback() {
    createNewUser();
  }

  return (
    <Layout>
      <form onSubmit={onSubmit}>
        <Input
          id="register-name"
          placeholder="Navn"
          name="name"
          errorMessage={errors.name}
          value={userInput.name}
          onChange={onChange}
        />
        <Input
          id="register-email"
          placeholder="E-post"
          name="email"
          errorMessage={errors.email}
          value={userInput.email}
          onChange={onChange}
        />
        <Input
          id="register-password"
          placeholder="Passord"
          name="password"
          errorMessage={errors.password}
          value={userInput.password}
          type="password"
          autoComplete="new-password"
          onChange={onChange}
        />

        <Button type="submit">Opprett bruker</Button>
      </form>
    </Layout>
  );
};

const CREATE_USER = gql`
  mutation CreateNewUser($name: String!, $email: String!, $password: String!) {
    register(
      registerInput: { name: $name, email: $email, password: $password }
    ) {
      name
      token
    }
  }
`;

export default RegisterPage;
