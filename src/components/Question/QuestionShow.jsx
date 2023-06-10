import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import {
  Card,
  Radio,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function QuestionShow({ formId }) {
  const [questions, setQuestions] = useState([]);
  const [formName, setformName] = useState('');
  const [score, setScore] = useState(0);
  const [stateAnswers, setStateAnswers] = useState([]);
  const [open, setOpen] = useState(false);

  const getQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/forms/${formId}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (response.status == 200) {
        setformName(response.data.data.form.name);
        setQuestions(response.data.data.form.quiz.questions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const getScore = () => {
    let currentScore = 0;
    if (stateAnswers.length == questions.length) {
      for (let i = 0; i < stateAnswers.length; i++) {
        if (stateAnswers[i] == undefined) {
          break;
        }
        if (stateAnswers[i] == '1') {
          currentScore = currentScore + 1;
        }
      }
    }
    setScore(currentScore);
  }

  const handleDialog = () => {
    getScore();
    setOpen(!open);
  }

  const handleSubmit = () => {

  }

  const renderQuestion = questions.map((res, indexQuestion) => {
    return (
      <Card key={indexQuestion} className="flex flex-col gap-2 px-2 py-4 my-1 mx-2 sm:px-8 sm:my-2 sm:mx-4">
        <h1 className="font-semibold my-1">
          Câu {indexQuestion + 1}. {res.question}
        </h1>
        {res.answers.map((answer, indexAnswer) => {
          return (
            <div key={indexAnswer} className="pr-4">
              <Radio
                id={indexAnswer + res.question}
                name={res.question}
                label={
                  <Typography color="blue-gray" className="font-medium flex">
                    {answer}
                  </Typography>
                }
                value={answer}
                ripple={false}
                onClick={(e) => {
                  if (e.target.value == res.key) stateAnswers[indexQuestion] = '1';
                  else stateAnswers[indexQuestion] = '0';
                }}
              />
            </div>
          )
        })}
      </Card>
    );
  });

  return (
    <Fragment>
      <Card className="bg-blue-500 py-4 mx-2 my-4 sm:mx-4">
        <Typography color="blue-gray" className="text-xl text-center text-white font-semibold px-2">
          {formName}
        </Typography></Card>
      {renderQuestion}
      <Card className="mx-2 my-8 sm:mx-4">
        <Button
          className="text-base block hover:bg-indigo-900"
          onClick={handleDialog}>
          Nộp bài
        </Button>
        <Dialog open={open} handler={handleDialog}>
          <DialogHeader className="text-2xl">{formName}</DialogHeader>
          <DialogBody className="text-center" divider>
            Xác nhận nộp bài!
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleDialog}
              className="mr-1"
            >
              <span>Hủy</span>
            </Button>
            <Button variant="gradient" onClick={handleSubmit}>
              <span>Xác nhận</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Card>
    </Fragment>
  );
}

export default QuestionShow;