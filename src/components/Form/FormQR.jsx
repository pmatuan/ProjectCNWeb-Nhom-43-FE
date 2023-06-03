import { Typography } from "@material-tailwind/react";
import propTypes from "prop-types";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

function FormQR({ form, actionBar }) {
  return ReactDOM.createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-300 opacity-80 rounded-lg"></div>
      <div className="fixed inset-0 lg:inset-20 p-20 bg-white rounded-lg">
        <div className="flex flex-col justify-between items-center h-full">
          <div className="flex flex-col items-center">
            <QRCode
              size={300}
              bgColor="white"
              fgColor="black"
              value={`http://192.168.1.5/forms/${form._id}/test`}
            />
            <div className="text-center mt-8">
              <Typography className="text-2xl">{form.quiz.name}</Typography>
              <Typography className="text-2xl">
                Mật khẩu:{" "}
                <span className="text-blue-500 font-bold">{form.password}</span>
              </Typography>
              <Typography className="text-2xl">
                Thay đổi mật khẩu sau: 5s
              </Typography>
            </div>
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
