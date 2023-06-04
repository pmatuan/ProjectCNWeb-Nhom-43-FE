import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import propTypes from "prop-types";
import UserContext from "../contexts/UserContext";

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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

  const isLoggedIn = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/", {
        withCredentials: true,
        credentials: "include",
      });

      if (response.status == 200) {
        localStorage.setItem("user", response.data.data.user.name);
        response.data.data.user.role === "admin" && navigate("/users");
        response.data.data.user.role === "teacher" && navigate("/forms");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  const updateRole = async (user, newRole) => {
    try {
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
    <UserContext.Provider
      value={{ users, setUsers, getUsers, updateRole, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: propTypes.any,
};
