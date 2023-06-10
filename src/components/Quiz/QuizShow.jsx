import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import propTypes from "prop-types";
import MenuButton from "../MenuButton";
import FormCreate from "../Form/FormCreate";
import React, { useContext, useState } from "react";
import QuizContext from "../../contexts/QuizContext";

function QuizShow({ quiz }) {
  const [showFormCreate, setShowFormCreate] = useState(false);
  const { deleteQuiz } = useContext(QuizContext);
  const handleClick = () => {
    setShowFormCreate(true);
  };

  const handleClose = () => {
    setShowFormCreate(false);
  };

  const actionBar = (
    <Button className="col-span-2 bg-gray-400" onClick={handleClose}>
      Đóng
    </Button>
  );

  return (
    <React.Fragment>
      {showFormCreate && (
        <FormCreate quiz={quiz} actionBar={actionBar} onSubmit={handleClose} />
      )}
      <Card className="mt-10 w-64 h-72">
        <CardHeader className="h-24">
          <img
            src="http://localhost:5173/src/assets/attendance-tracker-low-resolution-color-logo.png"
            className="object-center object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography className="font-bold">{quiz.name}</Typography>
          <Typography variant="small">
            Số lượng câu hỏi: {quiz.questions.length}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 w-full absolute bottom-0 flex justify-between">
          <a href="#" className="inline-block">
            <Button
              size="sm"
              className="flex items-center gap-2"
              onClick={handleClick}
            >
              Tạo bài kiểm tra
            </Button>
          </a>
          <MenuButton
            onDelete={() => deleteQuiz(quiz._id)}
            onShow={() => navigate(`/quizzes/${form._id}`)}
          />
        </CardFooter>
      </Card>
    </React.Fragment>
  );
}

QuizShow.propTypes = {
  quiz: propTypes.object.isRequired,
};

export default QuizShow;
