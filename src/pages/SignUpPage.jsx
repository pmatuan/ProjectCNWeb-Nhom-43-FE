import { Card, Typography } from "@material-tailwind/react";
import SignUpForm from "../components/Auth/SignUpForm";

function SignUpPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-b1 bg-cover bg-no-repeat ">
      <Card
        color="transparent"
        shadow={false}
        className="border p-8 shadow-2xl bg-white"
      >
        <Typography variant="h3" color="blue-gray">
          Đăng ký
        </Typography>
        <Typography color="gray" className="mt-1 text-md">
          Điền đầy đủ thông tin tài khoản.
        </Typography>
        <SignUpForm />
      </Card>
    </div>
  );
}

export default SignUpPage;
