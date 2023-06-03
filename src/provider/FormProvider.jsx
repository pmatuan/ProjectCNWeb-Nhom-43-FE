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
      //console.log(response);
      setForms(response.data.data.forms);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const closeForm = async (formId) => {
    try {
      const response = await axios.patch(
        `http://localhost:9000/api/v1/forms/${formId}/close`,
        {},
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(response);
      if (response.status == 200) {
        const updatedForms = forms.map((form) => {
          if (form._id === formId)
            return {
              ...form,
              isEnabled: false,
              password: response.data.data.form.password,
            };
          return form;
        });
        setForms(updatedForms);
        console.log("close");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startForm = async (formId, newPassword) => {
    try {
      const response = await axios.patch(
        `http://localhost:9000/api/v1/forms/${formId}/open`,
        {
          password: newPassword,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(response);
      if (response.status == 200) {
        const updatedForms = forms.map((form) => {
          if (form._id === formId)
            return { ...form, isEnabled: true, password: newPassword };
          return form;
        });
        setForms(updatedForms);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormContext.Provider
      value={{ forms, setForms, getForms, closeForm, startForm }}
    >
      {children}
    </FormContext.Provider>
  );
}

FormProvider.propTypes = {
  children: propTypes.any,
};
