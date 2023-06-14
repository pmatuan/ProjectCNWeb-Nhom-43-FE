import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import MainLayout from "../layouts/MainLayout";
import QuizNameDialog from "../components/Quiz/QuizNameDialog";
import QuestionDialog from "../components/Question/QuestionDialog";
import { API_URL } from "../configs";

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [quizContent, setQuizContent] = useState([]);

  const addQuestion = () => {
    setQuizContent((prevContent) => [
      ...prevContent,
      {
        question_type: "multichoice",
        question: "",
        answers: [],
        key: "",
        explanation: "",
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const response_createQuiz = await axios.post(
        `${API_URL}/api/v1/quizzes`,
        {
          name: quizName,
        },
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          withCredentials: true,
        }
      );
      const id = response_createQuiz.data.data.quiz.id;
      const questions = quizContent.map(
        ({ question, answers, key, explanation }) => ({
          question,
          answers,
          key,
          explanation,
        })
      );
      const response_addQuestions = await axios.post(
        `${API_URL}/api/v1/quizzes/${id}/questions`,
        {
          questions,
        },
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          withCredentials: true,
        }
      );
      window.location.href = "/forms";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-start items-center px-4 max-w-screen-xl w-full space-y-4 mt-6">
        <QuizNameDialog name={quizName} setQuizName={setQuizName} />
        <div className="relative flex flex-col w-full space-y-4">
          {quizContent.map((field, index) => (
            <div
              key={index}
              className="rounded-md bg-white flex w-full shadow-md px-4 border-2 border-blue-100"
            >
              <QuestionDialog
                field={field}
                index={index}
                quizContent={quizContent}
                setQuizContent={setQuizContent}
              />
            </div>
          ))}
          <div
            className="sticky xl:absolute bottom-10 -right-16 flex flex-col items-center bg-white p-2 rounded-md shadow-md"
            title="Thêm câu hỏi"
          >
            <button onClick={addQuestion}>
              <PlusCircleIcon className="w-8 h-8 text-gray-400 hover:text-blue-500" />
            </button>
          </div>
          <Button
            onClick={handleSubmit}
            className="block hover:bg-indigo-900 text-white px-4"
          >
            Lưu
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateQuiz;
