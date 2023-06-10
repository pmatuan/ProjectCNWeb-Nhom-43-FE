import propTypes from "prop-types";
import TableRow from "./TableRow";

function TableBody({ users }) {
  //console.log(users);
  const renderedRows = users.map((user) => {
    return <TableRow key={user._id} user={user} />;
  });
  //console.log(renderedRows);
  return <tbody>{renderedRows}</tbody>;
}

TableBody.propTypes = {
  users: propTypes.array,
};

export default TableBody;
