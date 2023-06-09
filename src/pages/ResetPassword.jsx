import { Card, Typography } from "@material-tailwind/react";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";

function ResetPassword() {
  return (
    <div className="min-h-screen grid place-items-center bg-b1 bg-cover bg-no-repeat ">
      <Card
        color="transparent"
        shadow={false}
        className="border p-8 shadow-2xl bg-white"
      >
        <Typography variant="h3" color="blue-gray">
          Đặt lại mật khẩu
        </Typography>
        <Typography color="gray" className="mt-1 text-md">
          Token đã được gửi tới email của bạn
        </Typography>
        <ResetPasswordForm />
      </Card>
    </div>
  );
}

export default ResetPassword;