import React, { useContext } from "react";
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
      <div className="mx-auto max-w-screen-2xl w-full px-2 py-3 flex justify-between mt-3">
        <Typography className="mt-2 text-blue-500 text-3xl font-bold align-center">
          Question Sets
        </Typography>
        <Button className="float-left flex items-center px-3">
          <PlusIcon className="h-4 me-2" />
          NEW
        </Button>
      </div>
      <div className="mx-auto max-w-screen-2xl w-full mt-3 border-gray-500">
        <div className="flex gap-6">{renderedQuizzes}</div>
      </div>
      <Pagination />
    </React.Fragment>
  );
}
export default QuizList;
