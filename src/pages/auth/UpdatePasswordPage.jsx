import { Card, Typography } from "@material-tailwind/react";
import UpdatePasswordForm from "../../components/Form/UpdatePasswordForm";

function UpdatePasswordPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-b1 bg-cover bg-no-repeat ">
      <Card
        color="transparent"
        shadow={false}
        className="border p-8 shadow-2xl bg-white"
      >
        <Typography variant="h3" color="blue-gray">
          Update Password
        </Typography>
        <UpdatePasswordForm />
      </Card>
    </div>
  );
}

export default UpdatePasswordPage;