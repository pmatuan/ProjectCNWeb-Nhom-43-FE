import { Card } from "@material-tailwind/react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function Table() {
  return (
    <Card className="overflow-auto max-w-screen-xl w-full mt-4 border-gray-500">
      <table className="min-w-max text-left border-blue-500">
        <TableHead
          headers={[
            "Họ tên",
            "Email",
            "Ngày tạo tài khoản",
            "Mã thiết bị",
            "Vai trò",
            "",
          ]}
        />
        <TableBody />
      </table>
    </Card>
  );
}

export default Table;
