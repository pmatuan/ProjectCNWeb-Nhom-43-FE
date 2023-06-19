import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Navbar as MNavbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";

import { API_URL } from "../configs";

function ProfileMenu() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const handleUpdatePassword = () => {
    setIsMenuOpen(false);
    navigate("/updatePassword");
  };

  const logout = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/v1/logout`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        withCredentials: true,
      });
      if (response.status === 200) {
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
    navigate("/login");
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="avatar"
            className="border border-blue-500 p-0.5"
            src="/src/assets/avatar.png"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          onClick={closeMenu}
          className="flex items-center gap-2 rounded"
        >
          <UserCircleIcon className="h-4 w-4" />
          <Typography as="span" variant="small">
            {localStorage.getItem("user") ? (
              localStorage.getItem("user")
            ) : (
              <Link to="/login">Đăng nhập</Link>
            )}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 rounded"
        >
          <PowerIcon className="h-4 w-4 text-red-500" />
          <Typography as="span" variant="small" className="text-red-500">
            Đăng xuất
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
function Navbar() {
  return (
    <MNavbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
          <img
            src="http://localhost:5173/src/assets/attendance-tracker-high-resolution-logo-black-on-transparent-background.png"
            className="h-7 w-full"
          />
        </Link>
        <ProfileMenu />
      </div>
    </MNavbar>
  );
}
export default Navbar;
