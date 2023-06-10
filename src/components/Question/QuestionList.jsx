import QuestionShow from "./QuestionShow";
import propTypes from "prop-types";

function QuestionList({ questions }) {
  const renderedQuestions = questions.map((question) => {
    return <QuestionShow key={question._id} question={question} />;
  });
  return <div className="w-full max-w-screen-lg">{renderedQuestions}</div>;
}

QuestionList.propTypes = {
  questions: propTypes.array,
};

export default QuestionList;
