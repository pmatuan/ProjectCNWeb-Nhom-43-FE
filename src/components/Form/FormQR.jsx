import { Typography } from "@material-tailwind/react";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

function FormQR({ form, actionBar }) {
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
      <div className="fixed inset-0 lg:inset-20 p-20 bg-white rounded-lg">
        <div className="flex flex-col justify-between items-center h-full">
          <div className="text-center">
            <QRCode
              size={300}
              bgColor="white"
              fgColor="black"
              value={`http://192.168.1.5/forms/${form._id}/test`}
            />
            <Typography className="text-2xl font-bold mt-3">
              {form.name}
            </Typography>
          </div>

          <div className="text-center">
            <Typography className="text-2xl">
              Thời gian còn lại: {formatTime(timeLeft)}
            </Typography>
            <Typography className="text-2xl">{form.quiz.name}</Typography>
            <Typography className="text-2xl">
              Mật khẩu:{" "}
              <span className="text-blue-500 font-bold">{form.password}</span>
            </Typography>
            <Typography className="text-2xl">
              Thay đổi mật khẩu sau:{" "}
              <span className="text-blue-500 font-bold">
                {resetTimeRemaining}
              </span>{" "}
              giây
            </Typography>
          </div>
          {actionBar}
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
