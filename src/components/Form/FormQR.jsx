import { Typography } from "@material-tailwind/react";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

function FormQR({ form, actionBar }) {
  const [timeRemaining, setTimeRemaining] = useState(4);

  useEffect(() => {
    if (timeRemaining >= 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else setTimeRemaining(4);
  }, [timeRemaining]);

  return ReactDOM.createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-300 opacity-80 rounded-lg"></div>
      <div className="fixed inset-0 lg:inset-20 p-20 bg-white rounded-lg">
        <div className="flex flex-col justify-between items-center h-full">
          <div>
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
            <Typography className="text-2xl">{form.quiz.name}</Typography>
            <Typography className="text-2xl">
              Mật khẩu:{" "}
              <span className="text-blue-500 font-bold">{form.password}</span>
            </Typography>
            <Typography className="text-2xl">
              Thay đổi mật khẩu sau:{" "}
              <span className="text-blue-500 font-bold">{timeRemaining}</span>{" "}
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
