import UserContext from "../contexts/UserContext";
import { useEffect, useContext } from "react";

function Homepage() {
  const { isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    isLoggedIn();
  });

  return <div>Redirecting...</div>;
}

export default Homepage;
