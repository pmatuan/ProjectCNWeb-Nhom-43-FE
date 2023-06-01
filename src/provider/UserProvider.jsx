import { useCallback, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import UserContext from "../contexts/UserContext";

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const response = await axios.get("http://localhost:9000/api/v1/users", {
      withCredentials: true,
      credentials: "include",
    });
    setUsers(response.data.data.users);
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers, getUsers }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: propTypes.any,
};
