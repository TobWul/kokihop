import React, { useState, useEffect } from "react";

import UserContext from "../../context/UserContext";
import { withFirebase } from "../../firebase/context";

const withAuthentication = (Component) => (props) => (
  <UserContext.Consumer>
    {(user) => <Component user={user} {...props} />}
  </UserContext.Consumer>
);
export default withAuthentication;
