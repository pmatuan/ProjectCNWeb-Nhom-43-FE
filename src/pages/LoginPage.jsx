import { Card, Typography } from "@material-tailwind/react";
import LoginForm from "../components/Auth/LoginForm";

function LoginPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-b1 bg-cover bg-no-repeat ">
      <Card
        color="transparent"
        shadow={false}
        className="border p-8 shadow-2xl bg-white"
      >
        <Typography variant="h3" color="blue-gray">
          Đăng nhập
        </Typography>
        <Typography color="gray" className="mt-1 text-md">
          Chào mừng trở lại!
        </Typography>
        <LoginForm />
      </Card>
    </div>
  );
}

export default LoginPage;
