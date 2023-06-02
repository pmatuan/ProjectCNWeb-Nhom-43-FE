import { useCallback, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import QuizContext from "../contexts/QuizContext";

export default function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState([]);

  const getQuizzes = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/quizzes", {
        withCredentials: true,
        credentials: "include",
      });
      //console.log(response);
      setQuizzes(response.data.data.quizzes);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <QuizContext.Provider value={{ quizzes, setQuizzes, getQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
}

QuizProvider.propTypes = {
  children: propTypes.any,
};
