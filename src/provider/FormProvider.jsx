import { useCallback, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import FormContext from "../contexts/FormContext";

export default function FormProvider({ children }) {
  const [forms, setForms] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  const getForms = useCallback(async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/forms?limit=4&&page=${page}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(response);
      setForms(response.data.data.forms);
      setMaxPage(Math.ceil(response.data.data.count / 4));
    } catch (err) {
      console.error(err);
    }
  }, []);

  //const getForm = () => {}

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

  const createForm = async (quizId, name, timeLimit) => {
    try {
      await axios.post(
        "http://localhost:9000/api/v1/forms",
        {
          name,
          quizId,
          timeLimit,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      await getForms();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormContext.Provider
      value={{
        forms,
        maxPage,
        setForms,
        getForms,
        closeForm,
        startForm,
        createForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

FormProvider.propTypes = {
  children: propTypes.any,
};
