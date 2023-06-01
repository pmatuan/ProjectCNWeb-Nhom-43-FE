import { Typography, Button } from "@material-tailwind/react";
import propTypes from "prop-types";

function TableRow({ user }) {
  console.log(user);
  return (
    <tr className="even:bg-blue-gray-50/50">
      <td className="p-4">
        <Typography variant="medium" color="blue-gray" className="font-normal">
          {user.name}
        </Typography>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <Typography variant="medium" color="blue-gray" className="font-normal">
          {user.email}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="medium" color="blue-gray" className="font-normal">
          {user.createdAt.split("T")[0]}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="medium" color="blue-gray" className="font-normal">
          {user.device}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="medium" color="blue-gray" className="font-normal">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </Typography>
      </td>
      <td className="p-4 text-center">
        <Button>Edit</Button>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  user: propTypes.object,
};

export default TableRow;
