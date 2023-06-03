import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import QuizContext from "../../contexts/QuizContext";
import QuizShow from "./QuizShow";
import Pagination from "../Pagination";

function QuizList() {
  const { quizzes } = useContext(QuizContext);

  const renderedQuizzes = quizzes.map((quiz) => (
    <QuizShow key={quiz._id} quiz={quiz} />
  ));

  return (
    <React.Fragment>
      <div className="max-w-screen-xl w-full p-2 mt-3 flex justify-between">
        <Typography className="text-blue-500 text-3xl font-bold">
          Bộ câu hỏi
        </Typography>
        <Link to="/createquiz" className="flex items-center gap-2">
          <Button className="float-left flex items-center px-3">
            <PlusIcon className="h-4 me-2" />
            Thêm mới
          </Button>
        </Link>
      </div>
      <div className="mx-auto max-w-screen-xl w-full flex justify-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {renderedQuizzes}
        </div>
      </div>
      <Pagination />
    </React.Fragment>
  );
}
export default QuizList;
