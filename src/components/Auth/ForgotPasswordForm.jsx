import { useState } from "react";
import axios from "axios";
import { Button, Typography, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../configs";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        `${API_URL}/api/v1/forgotPassword`,
        {
          email,
        },
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          withCredentials: true,
        }
      );

      console.dir(response);
      if (response.status === 200) {
        navigate("/resetpassword");
      } else setError(response.data.message);
    } catch (err) {
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
      </div>
      <Typography className="text-red-500 text-sm p-1">{error}</Typography>
      <Button className="mt-3" fullWidth onClick={handleSubmit}>
        Xác nhận
      </Button>
    </form>
  );
}

export default LoginForm;
