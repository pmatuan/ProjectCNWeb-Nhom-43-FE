import React, { useContext, useState } from "react";
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
import propTypes from "prop-types";

function FormShow({ form }) {
  const { closeForm, startForm } = useContext(FormContext);
  const [showQR, setShowQR] = useState(false);
  const [intervalID, setIntervalID] = useState(-1);

  const handleCloseQR = () => {
    setShowQR(false);
  };

  const actionBar = (
    <div className="grid grid-cols-2 gap-3">
      <Button>Ẩn mật khẩu</Button>
      <Button className="bg-gray-400" onClick={handleCloseQR}>
        Đóng
      </Button>
    </div>
  );
  const QR = <FormQR actionBar={actionBar} form={form} />;

  const handleCloseForm = () => {
    clearInterval(intervalID);
    closeForm(form._id);
  };

  const handleOpen = () => {
    const id = setInterval(() => {
      const newPassword = Math.round(Math.random() * 89999) + 10000;
      startForm(form._id, newPassword);
    }, 4995);
    setIntervalID(id);
    setShowQR(true);
  };

  return (
    <React.Fragment>
      {showQR && QR}
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
            Ngày tạo:{" "}
            {`${form.createdAt.split("T")[0]}; ${form.createdAt
              .split("T")[1]
              .slice(0, -5)}`}
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
          <MenuButton />
        </CardFooter>
      </Card>
    </React.Fragment>
  );
}

FormShow.propTypes = {
  form: propTypes.object.isRequired,
};

export default FormShow;
