import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Hjemmesiden</h1>
      <Link to="bok/123">Gå til din bok</Link>
    </div>
  );
};

export default Landing;
