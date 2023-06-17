import { useState, useEffect } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import axios from "axios";
import { API_URL } from "../../configs";
import SWAL from "sweetalert2";

function SignUpForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [device, setDevice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        `${API_URL}/api/v1/signup`,
        {
          name,
          email,
          password,
          passwordConfirm,
          device,
        },
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          withCredentials: true,
        }
      );

      console.dir(response);
      if (response.status === 201) {
        SWAL.fire({
          title: "Đăng ký thành công!",
          text: "Vui lòng đăng nhập lại vào hệ thống",
          icon: "success",
          confirmButtonText: "Quay lại đăng nhập",
        }).then(() => {
          navigate("/login");
        });
      } else setError(response.data.message);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    const getDevice = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setDevice(result.visitorId);
    };
    getDevice();
  }, []);

  return (
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-4 flex flex-col gap-6">
        <Input
          type="text"
          label="Họ tên"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
        />
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />
        <Input
          type="password"
          label="Mật khẩu"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />
        <Input
          type="password"
          label="Xác nhận mật khẩu"
          value={passwordConfirm}
          onChange={(event) => {
            setPasswordConfirm(event.target.value);
          }}
          required
        />
      </div>
      <Typography className="text-red-500 text-sm p-1">{error}</Typography>
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
      <Button className="mt-6" fullWidth onClick={handleSubmit}>
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
