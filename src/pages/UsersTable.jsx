import { useContext, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Table from "../components/Table/Table";
import UserContext from "../contexts/UserContext";
import Pagination from "../components/Pagination";

function UsersTable() {
  const { getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <MainLayout>
      <div className="max-w-screen-xl w-full p-2 mt-3 flex justify-between">
        <Typography className="mt-2 text-blue-500 text-3xl font-bold">
          Danh sách người dùng
        </Typography>
        <Button onClick={getUsers} className="flex items-center">
          <ArrowPathIcon className="h-4 me-2" />
          Tải lại
        </Button>
      </div>
      <Table />
      <Pagination />
    </MainLayout>
  );
}

export default UsersTable;
