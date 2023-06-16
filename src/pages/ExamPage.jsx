import { Fragment, useState } from "react";
import axios from "axios";
import FormPassword from "../components/Form/FormPassword";
import MainLayout from "../layouts/MainLayout";
import { API_URL } from "../configs";
import { Typography, Radio, Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";

function ExamPage() {
  //const [showSpinner, setShowSpinner] = useState(false);
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const { id } = useParams();

  const handlePasswordSubmit = async (password) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/forms/${id}/join`,
        { password },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(response.data.data.form);
      setForm(response.data.data.form);
    } catch (err) {
      console.error(err);
    } finally {
      console.log("OK");
    }
  };

  if (!form) return <FormPassword onSubmit={handlePasswordSubmit} />;

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/forms/${id}`,
        {
          answers,
          device: "#123456",
          location: "Ha Noi",
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(response);
      alert(`Điểm: ${response.data.data.attendance.grade}`);
    } catch (err) {
      console.error(err);
    }
  };

  const renderedQuestions = form.quiz.questions.map((question) => {
    return (
      <div
        key={question._id}
        className="border-2 border-gray-100 p-6 pb-3 my-3 rounded-xl grid gap-2"
      >
        <Typography className="pl-3">{question.question}</Typography>
        <div className="grid w-full">
          {question.answers.map((answer, index) => {
            return (
              <Radio
                key={index}
                name={question._id}
                value={question.answers[index]}
                label={answer}
                checked={answers[question.id] === answer}
                onChange={(e) => {
                  handleRadioChange(e);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  });

  const examForm = (
    <MainLayout>
      <Typography className="mt-10 mb-5">Bài kiểm tra: {form.name}</Typography>
      <form className="w-full max-w-screen-lg">
        {renderedQuestions}
        <Button onClick={handleFormSubmit} className="mt-9 mr-3 float-right">
          Nộp bài
        </Button>
      </form>
    </MainLayout>
  );

  return <Fragment>{examForm}</Fragment>;
}

export default ExamPage;
