import { useState } from "react";
import axios from "axios";
import { Button, Typography, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "http://localhost:9000/api/v1/login",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          withCredentials: true,
        }
      );

      console.dir(response);
      if (response.status === 200) {
        response.data.data.user.role === "admin" && navigate("/users");
      } else setError(response.data.message);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-1 flex flex-col gap-6">
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <Typography className="text-red-500 text-sm p-1">{error}</Typography>
      <div className="p-1 mt-2 flex flex-col items-end">
        <Link
          to="/forgot"
          className="text-sm text-blue-500 transition-colors hover:text-blue-700"
        >
          Forgot Password?
        </Link>
      </div>
      <Button className="mt-3" fullWidth onClick={handleSubmit}>
        LOG IN
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Don&#39;t have an account?{"  "}
        <Link
          to="/signup"
          className="font-medium text-blue-500 transition-colors hover:text-blue-700"
        >
          Sign up
        </Link>
      </Typography>
    </form>
  );
}

export default LoginForm;
