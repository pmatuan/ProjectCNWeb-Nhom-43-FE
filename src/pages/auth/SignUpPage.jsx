import { Card, Typography } from "@material-tailwind/react";
import SignUpForm from "../../components/Form/SignUpForm";

function SignUpPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-b1 bg-cover bg-no-repeat ">
      <Card
        color="transparent"
        shadow={false}
        className="border p-8 shadow-2xl bg-white"
      >
        <Typography variant="h3" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 text-md">
          Enter your details to register.
        </Typography>
        <SignUpForm />
      </Card>
    </div>
  );
}

export default SignUpPage;
