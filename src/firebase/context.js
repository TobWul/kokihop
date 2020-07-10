import React from "react";

const { Provider, Consumer } = React.createContext();

export const withFirebase = (Component) => (props) => (
  <Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </Consumer>
);

export {
  Provider as FirebaseContextProvider,
  Consumer as FirebaseContextConsumer,
};
