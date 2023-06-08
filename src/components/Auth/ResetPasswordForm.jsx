import { useState } from "react";
import axios from "axios";
import { Button, Typography, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function ResetPasswordForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.patch(
        `http://localhost:9000/api/v1/resetPassword/${token}`,
        {
          password,
          passwordConfirm,
        },
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          withCredentials: true,
        }
      );

      console.dir(response);
      if (response.status === 200) {
        navigate("/login");
      } else setError(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-1 flex flex-col gap-6">
        <Input
          type="text"
          label="Your token"
          value={token}
          onChange={event => { setToken(event.target.value) }}
          required
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={event => { setPassword(event.target.value) }}
          required
        />
        <Input
          type="password"
          label="Confirm password"
          value={passwordConfirm}
          onChange={event => { setPasswordConfirm(event.target.value) }}
          required
        />
      </div>
      <Typography className="text-red-500 text-sm p-1">{error}</Typography>
      <Button className="mt-3" fullWidth onClick={handleSubmit}>
        Xác nhận
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
