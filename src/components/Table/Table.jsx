import { Card } from "@material-tailwind/react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function Table() {
  return (
    <Card className="mx-auto max-w-screen-xl w-full mt-4 border-gray-500">
      <table className="w-full min-w-max text-left border-blue-500 ">
        <TableHead
          headers={["Name", "Email", "Joined at", "Device ID", "Role", ""]}
        />
        <TableBody />
      </table>
    </Card>
  );
}

export default Table;
