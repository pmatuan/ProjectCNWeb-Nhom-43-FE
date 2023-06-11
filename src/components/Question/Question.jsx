import React, { useState } from "react";
import { Radio, Typography, Collapse } from "@material-tailwind/react";
import propTypes from "prop-types";

function QuestionShow({ question }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

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
    <div className="border-2 border-gray-100 p-6 pb-3 my-3 rounded-xl grid gap-2">
      <Typography className="pl-3">{question.question}</Typography>
      <div className="grid">{renderedOptions}</div>
      <React.Fragment>
        <Typography
          className="text-blue-400 cursor-pointer p-3"
          onClick={toggleOpen}
        >
          Đáp án
        </Typography>
        <Collapse open={open}>
          <Typography>Đáp án: {question.key}</Typography>
          <Typography>Giải thích: {question.explanation}</Typography>
        </Collapse>
      </React.Fragment>
    </div>
  );
}

QuestionShow.propTypes = {
  question: propTypes.object,
};

export default QuestionShow;
