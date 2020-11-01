import { useState } from "react";

const useAuthForm = (callback, initialState) => {
  const [userInput, setState] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const [inputName, inputValue] = [e.target.name, e.target.value];
    setState({ ...userInput, [inputName]: inputValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return { userInput, errors, setErrors, onChange, onSubmit };
};

export default useAuthForm;
