import propTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

function TableHead({ headers }) {
  const renderedHeaders = headers.map((head) => (
    <th key={head} className="border-b border-blue-500 p-4">
      <Typography className="text-blue-500 text-md font-bold p">
        {head}
      </Typography>
    </th>
  ));

  return (
    <thead>
      <tr>{renderedHeaders}</tr>
    </thead>
  );
}

TableHead.propTypes = {
  headers: propTypes.arrayOf(propTypes.string),
};

export default TableHead;
