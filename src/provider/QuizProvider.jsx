import { useCallback, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import QuizContext from "../contexts/QuizContext";

export default function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  const getQuizzes = useCallback(async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/quizzes?limit=4&page=${page}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      //console.log(response);
      const response_getNumberOfQuestion = await axios.get(
        `http://localhost:9000/api/v1/quizzes`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      setQuizzes(response.data.data.quizzes);
      setMaxPage(
        Math.ceil(response_getNumberOfQuestion.data.data.quizzes.length / 4)
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/quizzes/${id}`, {
        withCredentials: true,
        credentials: "include",
      });
      await getQuizzes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <QuizContext.Provider
      value={{ quizzes, maxPage, setQuizzes, getQuizzes, deleteQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
}

QuizProvider.propTypes = {
  children: propTypes.any,
};
