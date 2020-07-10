import React, { useState } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../../lib/Routes";
import { withFirebase } from "../../../firebase/context";
import Button from "../../Button/Button";

const ForgotPasswordPage = ({ firebase }) => {
  const [codeSent, setCodeSent] = useState(false);
  return !codeSent ? (
    <ForgotPasswordFormCode firebase={firebase} setCodeSent={setCodeSent} />
  ) : (
    <ForgotPasswordFormReset />
  );
};

const ForgotPasswordFormCode = ({ firebase, setCodeSent }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const ERRORS = (errorCode) =>
    ({
      "auth/invalid-email": "Ugyldig e-post",
      "auth/user-not-found": "Fant ingen bruker med den e-posten",
    }[errorCode]);
  const onSubmit = (e) => {
    e.preventDefault();
    firebase
      .sendPasswordResetEmail(email)
      .then((response) => setCodeSent(true))
      .catch((error) => setError(error.code));
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>{error}</p>
      <Button type="submit">Send engangskode</Button>
    </form>
  );
};

const ForgotPasswordFormReset = ({ firebase, setCodeSent }) => {
  const [password, setEmail] = useState("");
  const [error, setError] = useState(null);
  const ERRORS = (errorCode) =>
    ({
      "auth/invalid-email": "Ugyldig e-post",
      "auth/user-not-found": "Fant ingen bruker med den e-posten",
    }[errorCode]);
  const onSubmit = (e) => {
    e.preventDefault();
    firebase
      .sendPasswordResetEmail(password)
      .then((response) => null)
      .catch((error) => setError(error.code));
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>{error}</p>
      <p onClick={() => setCodeSent(false)}>
        Ikke fått noen kode? Send på nytt
      </p>
    </form>
  );
};

const ForgotPasswordLink = () => (
  <Link to={ROUTES.FORGOT_PASSWORD}>Glemt passordet?</Link>
);

export default withFirebase(ForgotPasswordPage);
export { ForgotPasswordLink };
