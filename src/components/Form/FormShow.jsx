import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import MenuButton from "../MenuButton";
import propTypes from "prop-types";

function FormShow({ form }) {
  return (
    <Card className="w-64 h-72">
      <CardBody>
        <Typography className="font-bold">
          {form.name.split(" GMT")[0].slice(0, -9)}
        </Typography>
        <Typography variant="small">
          Chương 1: Tổng quan mạng máy tính
        </Typography>
        <Typography variant="small">
          Duration: <span className="font-bold">{form.timeLimit}</span> minutes
        </Typography>
        <Typography variant="small">
          Created at: {Date(form.createdAt).split(" GMT")[0]}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 w-full absolute bottom-0 flex justify-between">
        <a href="#" className="inline-block">
          <Button size="sm" className="flex items-center gap-2">
            Start Test
            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
          </Button>
        </a>
        <MenuButton />
      </CardFooter>
    </Card>
  );
}

FormShow.propTypes = {
  form: propTypes.object.isRequired,
};

export default FormShow;
