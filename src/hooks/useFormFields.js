import { useState } from "react";

const useFormFields = (initialState) => {
  const [fields, setFields] = useState(initialState);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  return [fields, handleFieldChange, setFields];
};

export default useFormFields;
