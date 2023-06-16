import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  Radio,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
} from "@material-tailwind/react";
import useGeoLocation from "../Location/UseGeoLocation";

function QuestionShow() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [formName, setformName] = useState("");
  const [open, setOpen] = useState(false);
  const [submited, setSubmited] = useState(false);
  const { id } = useParams();
  const location = useGeoLocation();

  useEffect(() => {
    const getQuestions = async (password) => {
      try {
        const response = await axios.post(
          `http://localhost:9000/api/v1/forms/${id}/join`,
          {
            password,
          },
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

    getQuestions(123456);
  }, [id]);

  const handleDialog = () => {
    setOpen(!open);
  };

  const verifyLocation = (latitude, longitude) => {
    const userLat = location.latitude.toFixed(3);
    const userLog = location.longitude.toFixed(3);
    console.log(userLat, userLog);
    if (userLat == latitude && userLog == longitude) return true;
    else return false;
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/forms/${id}`,
        {
          answers,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (response.status == 201) {
        console.log("Submited");
      }
    } catch (err) {
      console.log(err);
    }
    setSubmited(true);
    console.log(verifyLocation(location.latitude, location.longitude));
  };

  const renderQuestion = questions.map((question, indexQues) => {
    return (
      <Card
        key={question._id}
        className="flex flex-col gap-2 px-2 py-4 my-1 mx-2 sm:px-8 sm:my-2 sm:mx-4"
      >
        <h1 className="font-semibold my-1">
          Câu {indexQues + 1}. {question.question}
        </h1>
        {question.answers.map((answer, indexAnswer) => {
          return (
            <div key={indexAnswer} className="pr-4">
              <Radio
                id={`${question._id}${indexAnswer}`}
                name={question._id}
                label={
                  <Typography color="blue-gray" className="font-medium flex">
                    {answer}
                  </Typography>
                }
                value={answer}
                ripple={false}
                onClick={(e) => {
                  answers[question._id] = e.target.value;
                  setAnswers(answers);
                  console.log(answers);
                }}
              />
            </div>
          );
        })}
      </Card>
    );
  });

  return (
    <React.Fragment>
      {submited ? (
        <Alert>
          <Typography className="text-xl text-white font-semibold">
            Bạn đã nộp bài kiểm tra!
          </Typography>
        </Alert>
      ) : (
        <div>
          <Card className="bg-blue-500 py-4 mx-2 my-4 sm:mx-4">
            <Typography
              color="blue-gray"
              className="text-xl text-center text-white font-semibold px-2"
            >
              {formName}
            </Typography>
          </Card>
          {renderQuestion}
          <Card className="mx-2 my-8 sm:mx-4">
            <Button
              className="text-base block hover:bg-indigo-900"
              onClick={handleDialog}
            >
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
        </div>
      )}
    </React.Fragment>
  );
}

export default QuestionShow;
