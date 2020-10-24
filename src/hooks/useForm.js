import { useEffect, useState } from "react";

export const useForm = (initialState = {}, errors = {}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [disableButton, setDisableButton] = useState(true);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleDisableButton = (values) => {
    let disableButton = false;
    for (let field in values) {
      if (values[field] === "") disableButton = true;
    }
    setDisableButton(disableButton);
  };

  const reset = () => {
    setFormValues(initialState);
  };

  useEffect(() => {
    handleDisableButton(formValues);
  }, [formValues]);

  return [formValues, handleInputChange, reset, disableButton];
};
