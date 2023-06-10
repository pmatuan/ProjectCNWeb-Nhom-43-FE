import propTypes from "prop-types";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

function MenuButton({ onShow, onDelete }) {
  return (
    <Menu>
      <MenuHandler>
        <Button className="px-2 py-0" color="gray">
          <EllipsisHorizontalIcon className="w-4" />
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={onShow}>
          <Typography>Xem chi tiết</Typography>
        </MenuItem>
        <MenuItem onClick={onDelete}>
          <Typography color="red">Xóa</Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

MenuButton.propTypes = {
  onShow: propTypes.func,
  onDelete: propTypes.func,
};

export default MenuButton;
