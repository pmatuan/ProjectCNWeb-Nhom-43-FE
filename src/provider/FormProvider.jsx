import { useCallback, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import FormContext from "../contexts/FormContext";

export default function FormProvider({ children }) {
  const [forms, setForms] = useState([]);

  const getForms = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/forms", {
        withCredentials: true,
        credentials: "include",
      });
      console.log(response);
      setForms(response.data.data.forms);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <FormContext.Provider value={{ forms, setForms, getForms }}>
      {children}
    </FormContext.Provider>
  );
}

FormProvider.propTypes = {
  children: propTypes.any,
};
