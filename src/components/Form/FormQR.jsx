import { Typography, Button } from "@material-tailwind/react";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

function FormQR({ form, actionBar }) {
  const [showPassword, setShowPassword] = useState(true);
  const [resetTimeRemaining, setResetTimeRemaining] = useState(4);
  const [timeLeft, setTimeLeft] = useState(Number(form.timeLimit + 1) * 60);

  useEffect(() => {
    setResetTimeRemaining(4);
  }, [form]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1); //previous state value
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds < 0) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (resetTimeRemaining >= 0) {
      const timer = setTimeout(() => {
        setResetTimeRemaining(resetTimeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else setResetTimeRemaining(0);
  }, [resetTimeRemaining]);

  return ReactDOM.createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-300 opacity-80 rounded-lg"></div>
      <div className="overflow-auto min-h-100 fixed inset-0 lg:inset-20 p-10 bg-white rounded-lg">
        <div className="flex flex-col justify-between items-center h-full">
          <div className="text-center">
            <QRCode
              size={270}
              bgColor="white"
              fgColor="black"
              value={`http://localhost:5173/forms/${form._id}/exam`}
            />
            <Typography className="text-xl font-bold mt-3">
              {form.name}
            </Typography>
          </div>

          <div className="text-center">
            <Typography className="text-xl">
              Thời gian còn lại: {formatTime(timeLeft)}
            </Typography>
            <Typography className="text-xl">{form.quiz.name}</Typography>
            {showPassword && (
              <React.Fragment>
                <Typography className="text-xl">
                  Mật khẩu:{" "}
                  <span className="text-blue-500 font-bold">
                    {form.password}
                  </span>
                </Typography>
                <Typography className="text-xl">
                  Thay đổi mật khẩu sau:{" "}
                  <span className="text-blue-500 font-bold">
                    {resetTimeRemaining}
                  </span>{" "}
                  giây
                </Typography>
              </React.Fragment>
            )}
          </div>
          <div className="grid grid-cols-4 gap-3">
            <Button
              className="col-span-3"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            </Button>
            {actionBar}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

FormQR.propTypes = {
  form: propTypes.object,
  onClose: propTypes.func,
  actionBar: propTypes.element,
};

export default FormQR;
