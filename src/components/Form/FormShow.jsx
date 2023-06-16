import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContext from "../../contexts/FormContext";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import MenuButton from "../MenuButton";
import FormQR from "./FormQR";
import FormEdit from "../Form/FormEdit";
import propTypes from "prop-types";

function FormShow({ form }) {
  const navigate = useNavigate();
  const { closeForm, startForm, deleteForm } = useContext(FormContext);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [intervalID, setIntervalID] = useState(-1);

  const handleClickEdit = () => {
    console.log(form);
    setShowFormEdit(true);
  };

  const handleCloseEdit = () => {
    setShowFormEdit(false);
  };

  const ISOtoLocale = (ISOdate) => {
    const date = new Date(ISOdate);
    return date.toLocaleString();
  };

  const handleCloseQR = () => {
    setShowQR(false);
  };

  const handleOpen = () => {
    const id = setInterval(() => {
      const newPassword = Math.round(Math.random() * 89999) + 10000;
      startForm(form._id, newPassword);
    }, 5000);
    setIntervalID(id);
    setShowQR(true);
  };

  const actionBarEdit = (
    <Button className="col-span-2 bg-gray-400" onClick={handleCloseEdit}>
      Đóng
    </Button>
  );

  const actionBar = (
    <Button className="bg-gray-400" onClick={handleCloseQR}>
      Đóng
    </Button>
  );

  const QR = <FormQR actionBar={actionBar} form={form} />;

  const handleCloseForm = () => {
    clearInterval(intervalID);
    closeForm(form._id);
  };

  return (
    <>
      {showQR && QR}
      {showFormEdit && (
        <FormEdit
          id={form._id}
          quiz={form.quiz}
          actionBar={actionBarEdit}
          onSubmit={handleCloseEdit}
          formName={form.name}
          formtimeLimit={form.timeLimit}
        />
      )}
      <Card className="w-64 h-80 hover:">
        <CardBody>
          <Typography
            className="font-bold cursor-pointer hover:text-blue-500"
            //onClick={() => {setShowQR(true);}}
          >
            {form.name}
          </Typography>
          <Typography variant="small">{form.quiz.name}</Typography>
          <Typography variant="small">
            Thời gian làm bài:{" "}
            <span className="font-bold">{form.timeLimit}</span> phút
          </Typography>
          <Typography variant="small">
            Ngày tạo: {ISOtoLocale(form.createdAt)}
          </Typography>
        </CardBody>
        <CardFooter className="w-full absolute bottom-0 flex justify-between">
          {!form.isEnabled ? (
            <Button
              size="sm"
              className="flex items-center gap-2"
              onClick={handleOpen}
            >
              Bắt đầu
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              className="flex items-center gap-2 bg-transparent text-blue-600 border border-blue"
              onClick={handleCloseForm}
            >
              Kết thúc
            </Button>
          )}
          <MenuButton
            onDelete={() => deleteForm(form._id)}
            onEdit={handleClickEdit}
            onShow={() => navigate(`/forms/${form._id}`)}
          />
        </CardFooter>
      </Card>
    </>
  );
}

FormShow.propTypes = {
  form: propTypes.object.isRequired,
};

export default FormShow;
