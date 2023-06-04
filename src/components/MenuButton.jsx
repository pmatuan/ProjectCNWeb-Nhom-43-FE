import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function MenuButton() {
  return (
    <Menu>
      <MenuHandler>
        <Button className="px-2 py-0" color="gray">
          <EllipsisHorizontalIcon className="w-4" />
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem>
          <Typography>Xem chi tiết</Typography>
        </MenuItem>
        <MenuItem>
          <Typography color="red">Xóa</Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
