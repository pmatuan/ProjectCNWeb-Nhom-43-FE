import { useContext, useEffect } from "react";
import QuizContext from "../contexts/QuizContext";
import FormContext from "../contexts/FormContext";
import QuizList from "../components/Quiz/QuizList";
import FormList from "../components/Form/FormList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function QuizForm() {
  const { getQuizzes } = useContext(QuizContext);
  const { getForms } = useContext(FormContext);

  useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);

  useEffect(() => {
    getForms();
  }, [getForms]);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <Navbar />
      <FormList />
      <QuizList />
      <Footer />
    </div>
  );
}

export default QuizForm;
