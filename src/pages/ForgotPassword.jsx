import { Card, Typography } from "@material-tailwind/react";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm"

function ForgotPassword() {
  return (
    <div className="min-h-screen grid place-items-center bg-b1 bg-cover bg-no-repeat ">
      <Card
        color="transparent"
        shadow={false}
        className="border p-8 shadow-2xl bg-white"
      >
        <Typography variant="h3" color="blue-gray">
          Quên mật khẩu
        </Typography>
        <Typography color="gray" className="mt-1 text-md">
          Xác nhận email để lấy lại mật khẩu!
        </Typography>
        <ForgotPasswordForm />
      </Card>
    </div>
  );
}

export default ForgotPassword;