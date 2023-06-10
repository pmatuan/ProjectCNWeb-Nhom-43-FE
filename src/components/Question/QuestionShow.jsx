import { Radio, Typography } from "@material-tailwind/react";
import propTypes from "prop-types";

function QuestionShow({ question }) {
  const renderedOptions = question.answers.map((answer, index) => {
    return (
      <Radio
        key={index}
        name={question._id}
        label={answer}
        id={`${question._id}${index}`}
      />
    );
  });

  return (
    <div>
      <Typography>{question.question}</Typography>
      <div className="grid">{renderedOptions}</div>
    </div>
  );
}

QuestionShow.propTypes = {
  question: propTypes.object,
};

export default QuestionShow;
