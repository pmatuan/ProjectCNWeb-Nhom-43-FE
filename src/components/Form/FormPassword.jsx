import propTypes from "prop-types";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";

function FormPassword({ onSubmit }) {
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(password);
  };

  return (
    <AuthLayout>
      <Typography variant="h5">Nhập mật khẩu để làm bài kiểm tra</Typography>
      <form className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96">
        <Input
          type="number"
          label="Password"
          value={password}
          onChange={(event) => {
            handleChange(event);
          }}
        />
        <Button onClick={handleSubmit} className="mt-3 w-full">
          Làm bài
        </Button>
      </form>
    </AuthLayout>
  );
}

FormPassword.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default FormPassword;
