import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import TableRow from "./TableRow";

function TableBody() {
  const { users } = useContext(UserContext);
  //console.log(users);
  const renderedRows = users.map((user) => {
    return <TableRow key={user._id} user={user} />;
  });
  //console.log(renderedRows);
  return <tbody>{renderedRows}</tbody>;
}

export default TableBody;
