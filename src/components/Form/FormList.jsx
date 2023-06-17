import React, { useContext } from "react";
import { Typography } from "@material-tailwind/react";
import FormContext from "../../contexts/FormContext";
import FormShow from "../Form/FormShow";
import Pagination from "../Pagination";

function FormList() {
  const { forms, maxPage, getForms } = useContext(FormContext);

  const renderedForms = forms.map((form) => (
    <FormShow key={form._id} form={form} />
  ));

  return (
    <React.Fragment>
      <div className="max-w-screen-xl w-full p-2 mt-3 overflow-auto">
        <Typography className="text-blue-500 text-3xl font-bold">
          Bài kiểm tra
        </Typography>
      </div>
      <div className="mx-auto max-w-screen-xl w-full flex justify-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {renderedForms}
        </div>
      </div>
      <Pagination getElements={getForms} max={maxPage} />
    </React.Fragment>
  );
}
export default FormList;
