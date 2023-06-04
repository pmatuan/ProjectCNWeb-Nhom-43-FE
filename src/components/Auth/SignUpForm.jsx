import { Input, Button, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function SignUpForm() {
  return (
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-4 flex flex-col gap-6">
        <Input type="text" label="Họ tên" required />
        <Input type="email" label="Email" required />
        <Input type="password" label="Mật khẩu" required />
        <Input type="password" label="Xác nhận mật khẩu" required />
      </div>
      <div>
        <Typography
          variant="small"
          color="gray"
          className="flex items-center gap-1 font-normal mt-2"
        >
          <InformationCircleIcon className="w-4 h-4 -mt-px" />
          Mật khẩu phải có ít nhất 8 kí tự
        </Typography>
      </div>

      <Button className="mt-6" fullWidth>
        Đăng ký
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Đã có tài khoản?{"  "}
        <Link
          to="/login"
          className="font-medium text-blue-500 transition-colors hover:text-blue-700"
        >
          Đăng nhập
        </Link>
      </Typography>
    </form>
  );
}

export default SignUpForm;
