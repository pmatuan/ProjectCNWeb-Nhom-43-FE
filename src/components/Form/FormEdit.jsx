import React, { useState, useContext } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import propTypes from "prop-types";
import ReactDOM from "react-dom";
import FormContext from "../../contexts/FormContext";

function FormEdit({ id, quiz, actionBar, onSubmit, formName, formtimeLimit }) {
  const [name, setName] = useState(formName);
  const [timeLimit, setTimeLimit] = useState(formtimeLimit);
  const { updateForm } = useContext(FormContext);

  const handleSubmit = () => {
    updateForm(quiz._id, name, timeLimit, id);
    onSubmit();
  };

  return ReactDOM.createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-300 opacity-80"></div>
      <div className="fixed inset-0  md:inset-20 lg:inset-x-1/3 lg:inset-y-44 p-20 bg-white rounded-2xl">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="text-center grid gap-8 -mt-3">
            <Typography className="text-2xl font-bold">
              Bộ câu hỏi: {quiz.name}
            </Typography>
            <form className="grid gap-4 w-full">
              <Input
                type="text"
                label="Tên bài kiểm tra"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
              />
              <Input
                type="number"
                label="Thời gian (phút)"
                value={timeLimit}
                onChange={(event) => {
                  setTimeLimit(event.target.value);
                }}
                required
              />
            </form>
            <div className="grid grid-cols-6 gap-3">
              <Button className="col-span-4" onClick={handleSubmit}>
                Lưu
              </Button>
              {actionBar}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

FormEdit.propTypes = {
  form: propTypes.object,
  onSubmit: propTypes.func,
  actionBar: propTypes.element,
};

export default FormEdit;
