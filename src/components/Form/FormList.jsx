import React, { useContext } from "react";
import { Typography } from "@material-tailwind/react";
import FormContext from "../../contexts/FormContext";
import FormShow from "../Form/FormShow";
import Pagination from "../Pagination";

function FormList() {
  const { forms } = useContext(FormContext);

  const renderedQuizzes = forms.map((form) => (
    <FormShow key={form._id} form={form} />
  ));

  return (
    <React.Fragment>
      <div className="mx-auto max-w-screen-2xl w-full px-2 py-3 flex justify-between mt-3">
        <Typography className="mt-1 text-blue-500 text-3xl font-bold">
          Forms
        </Typography>
      </div>
      <div className="mx-auto max-w-screen-2xl w-full border-gray-500">
        <div className="flex gap-6">{renderedQuizzes}</div>
      </div>
      <Pagination />
    </React.Fragment>
  );
}
export default FormList;
