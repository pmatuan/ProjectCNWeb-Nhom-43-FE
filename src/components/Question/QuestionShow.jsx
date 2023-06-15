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
import { API_URL } from "../../configs";

function QuestionShow() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [formName, setformName] = useState("");
  const [open, setOpen] = useState(false);
  const [submited, setSubmited] = useState(false);
  const { id } = useParams();
  const location = useGeoLocation();

  const getQuestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/forms/${id}`, {
        withCredentials: true,
        credentials: "include",
      });
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
        `${API_URL}/api/v1/forms/${id}`,
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
          <Typography
            className="text-xl text-center text-black font-semibold"
            style={{ marginTop: "20px" }}
          >
            Form: {formName}
          </Typography>

          {renderQuestion}
          <Card className="mx-2 my-8 sm:mx-4">
            <Button
              className="text-base block hover:bg-indigo-900"
              onClick={handleDialog}
            >
              Nộp bài
            </Button>
            <Dialog open={open} handler={handleDialog}>
              <DialogHeader>
                <Typography variant="h5" color="blue-gray">
                  Thông báo
                </Typography>
              </DialogHeader>
              <DialogBody divider className="grid place-items-center gap-4">
                <Typography variant="h4">
                  Xác nhận nộp bài kiểm tra!
                </Typography>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button variant="gradient" onClick={handleSubmit}>
                  Xác nhận
                </Button>
                <Button variant="text" color="blue-gray" onClick={handleDialog}>
                  Đóng
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
