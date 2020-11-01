import React from "react";
import { withFirebase } from "../../../firebase/context";
import Button from "../../Button/Button";

const SignOutButton = ({ firebase }) => (
  <Button type="button" onClick={firebase.signOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
