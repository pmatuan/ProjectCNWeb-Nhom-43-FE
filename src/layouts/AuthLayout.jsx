import propTypes from "prop-types";
import { Card } from "@material-tailwind/react";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid place-items-center bg-b1 bg-cover bg-no-repeat">
      <Card
        color="transparent"
        shadow={false}
        className="border p-8 shadow-2xl bg-white"
      >
        {children}
      </Card>
    </div>
  );
}

AuthLayout.propTypes = {
  children: propTypes.any,
};

export default AuthLayout;
