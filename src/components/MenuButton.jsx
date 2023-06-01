import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
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
        <MenuItem>Detail</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
