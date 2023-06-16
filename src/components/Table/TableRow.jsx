import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import propTypes from "prop-types";

import RoleEdit from "./RoleEdit";

function TableRow({ user }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <tr className="even:bg-blue-gray-50/50">
      <td className="p-4">
        <Typography color="blue-gray" className="font-normal">
          {user.name}
        </Typography>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <Typography color="blue-gray" className="font-normal">
          {user.email}
        </Typography>
      </td>
      <td className="p-4">
        <Typography color="blue-gray" className="font-normal">
          {user.createdAt.substring(0, 10)}
        </Typography>
      </td>
      <td className="p-4">
        {showEdit ? (
          <RoleEdit user={user} onSubmit={handleEdit} />
        ) : (
          <Typography color="blue-gray">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Typography>
        )}
      </td>
      <td className="p-4 text-center">
        {showEdit ? (
          <Button onClick={handleEdit} className="px-3 bg-red-400">
            <XMarkIcon className="h-4" />
          </Button>
        ) : (
          <Button onClick={handleEdit} className="px-3">
            <PencilSquareIcon className="h-4" />
          </Button>
        )}
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  user: propTypes.object,
};

export default TableRow;
