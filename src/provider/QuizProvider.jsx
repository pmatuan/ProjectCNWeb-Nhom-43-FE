import { useCallback, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import QuizContext from "../contexts/QuizContext";
import { API_URL } from "../configs";

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
      setQuizzes(response.data.data.quizzes);
      setMaxPage(Math.ceil(response.data.data.count / 4));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/v1/quizzes/${id}`, {
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
