import React from "react";
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
    <Card className="w-64 h-80">
      <CardBody>
        <Typography className="font-bold">{form.name}</Typography>
        <Typography variant="small">{form.quiz.name}</Typography>
        <Typography variant="small">
          Thời gian làm bài: <span className="font-bold">{form.timeLimit}</span>{" "}
          phút
        </Typography>
        <Typography variant="small">
          Ngày tạo:{" "}
          {`${form.createdAt.split("T")[0]}; ${form.createdAt
            .split("T")[1]
            .slice(0, -5)}`}
        </Typography>
      </CardBody>
      <CardFooter className="w-full absolute bottom-0 flex justify-between">
        {form.isEnabled ? (
          <React.Fragment>
            <Button size="sm" className="flex items-center gap-2">
              Bắt đầu
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </React.Fragment>
        ) : (
          <Button size="sm" className="flex items-center gap-2" color="cyan">
            Kết thúc
          </Button>
        )}
        <MenuButton />
      </CardFooter>
    </Card>
  );
}

FormShow.propTypes = {
  form: propTypes.object.isRequired,
};

export default FormShow;
