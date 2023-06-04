import { useContext, useState } from "react";
import propTypes from "prop-types";
import UserContext from "../../contexts/UserContext";
import { Select, Option, Button } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";

function RoleEdit({ user, onSubmit }) {
  const { updateRole } = useContext(UserContext);
  const [role, setRole] = useState(user.role);

  const handleChange = (event) => {
    setRole(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateRole(user, role);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div className="mr-2">
          <Select label="Select Role" onChange={handleChange} value={role}>
            <Option value="teacher">Teacher</Option>
            <Option value="admin">Admin</Option>
            <Option value="student">Student</Option>
          </Select>
        </div>
        <Button type="submit" className="px-3">
          <CheckIcon className="h-4" />
        </Button>
      </div>
    </form>
  );
}

RoleEdit.propTypes = {
  user: propTypes.object,
  onSubmit: propTypes.func,
};

export default RoleEdit;
