import { Typography } from "@material-tailwind/react";
import propTypes from "prop-types";

function TableRow({ attandance }) {
  const ISOtoLocale = (ISOdate) => {
    const date = new Date(ISOdate);
    return date.toLocaleString();
  };

  return (
    <tr className="even:bg-blue-gray-50/50">
      <td className="p-4">
        <Typography color="blue-gray">{attandance.user.name}</Typography>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <Typography color="blue-gray">{attandance.user.email}</Typography>
      </td>
      <td className="p-4">
        <Typography color="blue-gray">{attandance.grade}</Typography>
      </td>
      <td className="p-4">
        <Typography color="blue-gray">
          {ISOtoLocale(attandance.createdAt)}
        </Typography>
      </td>
      <td className="p-4">
        <Typography color="blue-gray">{attandance.user.device}</Typography>
      </td>
      <td className="p-4">
        <Typography color="blue-gray">{attandance.device}</Typography>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  attandance: propTypes.object,
};

export default TableRow;
