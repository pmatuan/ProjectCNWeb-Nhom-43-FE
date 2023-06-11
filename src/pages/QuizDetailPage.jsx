import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import MainLayout from "../layouts/MainLayout";
import QuestionList from "../components/Question/QuestionList";

function QuizDetail() {
  const [quiz, setQuiz] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/v1/quizzes/${id}`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        console.log(response.data.data.quiz);
        setQuiz(response.data.data.quiz);
      } catch (err) {
        console.error(err);
      }
    };
    getQuiz();
  }, [id]);

  //Đợi useEffect chạy
  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MainLayout>
        <Typography className="my-3">Bài kiểm tra: {quiz.name}</Typography>
        <QuestionList questions={quiz.questions} />
      </MainLayout>
    </div>
  );
}

export default QuizDetail;
