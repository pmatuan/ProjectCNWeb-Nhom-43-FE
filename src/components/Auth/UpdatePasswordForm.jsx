import { useState } from "react";
import axios from "axios";
import { Button, Typography, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

function UpdatePasswordForm() {
  const navigate = useNavigate();
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.patch(
        "http://localhost:9000/api/v1/updatePassword",
        {
          passwordCurrent,
          password,
          passwordConfirm
        },
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          withCredentials: true,
        }
      );

      console.dir(response);
      if (response.status === 200) {
        alert("updated password");
        navigate("/users");
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
          type="passwordCurrent"
          label="Current Password"
          value={passwordCurrent}
          onChange={event => setPasswordCurrent(event.target.value)}
          required
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
        <Input
          type="passwordConfirm"
          label="Confirm Password"
          value={passwordConfirm}
          onChange={event => setPasswordConfirm(event.target.value)}
          required
        />
      </div>
      <Button className="mt-3" fullWidth onClick={handleSubmit}>
        UPDATE PASSWORD
      </Button>
    </form>
  );
}

export default UpdatePasswordForm;