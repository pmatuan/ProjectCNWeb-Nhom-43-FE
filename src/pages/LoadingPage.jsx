import UserContext from "../contexts/UserContext";
import { Spinner } from "@material-tailwind/react";
import { useEffect, useContext } from "react";

function LoadingPage() {
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    isLoggedIn();
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="h-12 w-12" />
    </div>
  );
}

export default LoadingPage;
