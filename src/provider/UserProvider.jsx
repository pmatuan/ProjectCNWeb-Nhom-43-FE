import { useCallback, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import UserContext from "../contexts/UserContext";

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/v1/users?limit=8&page=1",
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      setUsers(response.data.data.users);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const updateRole = async (user, newRole) => {
    try {
      console.log(user._id);
      const response = await axios.patch(
        "http://localhost:9000/api/v1/users",
        {
          userId: user._id,
          newRole: newRole,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log("Run");
      if (response.status == 200) {
        const updatedUsers = users.map((u) => {
          if (u._id === user._id) return { ...user, role: newRole };
          return u;
        });
        console.log(updatedUsers);
        setUsers(updatedUsers);
        console.log("Updated!!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider value={{ users, setUsers, getUsers, updateRole }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: propTypes.any,
};
