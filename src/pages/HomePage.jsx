import MainLayout from "../layouts/MainLayout";
import UserContext from "../contexts/UserContext";
import { useEffect, useContext } from "react";

function Homepage() {
  const { isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    isLoggedIn();
  });

  return (
    <div>
      <MainLayout>Please Login!!</MainLayout>
    </div>
  );
}

export default Homepage;
