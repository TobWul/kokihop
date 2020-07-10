import React from "react";
import { useState } from "react";
import Button from "../../Button/Button";
import { useHistory } from "react-router-dom";
import { withFirebase } from "../../../firebase/context";
import ROUTES from "../../../lib/Routes";

const Login = ({ firebase }) => {
  const INTIAL = {
    email: "",
    password: "",
    error: "",
  };

  const history = useHistory();

  const getErrorMessage = (errorCode) => {
    const errorDB = {
      "auth/invalid-email": "Ugyldig e-post",
      "auth/user-disabled": "Denne brukeren har blitt deaktivert",
    };
    const catchMessage = "Feil e-post eller passord";
    const result = errorDB[errorCode];
    return result ? result : catchMessage;
  };

  const [loginData, setLoginData] = useState(INTIAL);

  const onChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
      error: null,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    firebase
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setLoginData({ ...INTIAL });
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setLoginData({ ...INTIAL, error: getErrorMessage(error.code) });
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        value={loginData.email}
        onChange={onChange}
        name="email"
        id="email"
        placeholder="E-post"
      />
      <input
        type="password"
        value={loginData.password}
        onChange={onChange}
        name="password"
        id="password"
        placeholder="Passord"
      />
      <p>{loginData.error}</p>
      <Button type="submit">Logg inn</Button>
    </form>
  );
};

export default withFirebase(Login);
