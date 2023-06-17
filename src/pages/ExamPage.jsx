import { Fragment, useState } from "react";
import axios from "axios";
import SWAL from "sweetalert2";
import FormPassword from "../components/Form/FormPassword";
import MainLayout from "../layouts/MainLayout";
import { API_URL } from "../configs";
import { Typography, Radio, Button } from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";

import getDevice from "../service/getDevice";
import getCoordinates from "../service/getLocation";

function ExamPage() {
  const navigate = useNavigate();
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
      console.log(err);
      SWAL.fire({
        icon: "error",
        title: "Sai mật khẩu",
        text: "Vui lòng thử lại!",
      });
    }
  };

  if (!form) return <FormPassword onSubmit={handlePasswordSubmit} />;

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: value }));
  };

  const handleFormSubmit = async () => {
    const device = await getDevice();
    const location = await getCoordinates();
    axios
      .post(
        `${API_URL}/api/v1/forms/${id}`,
        {
          answers,
          device: device,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((response) => {
        console.log(response);
        SWAL.fire(
          "Nộp bài thành công!",
          `Điểm của bạn là: ${response.data.data.attendance.grade}`,
          "success"
        ).then(() => {
          navigate("/students");
        });
      })
      .catch((err) => {
        console.error(err);
      });
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
