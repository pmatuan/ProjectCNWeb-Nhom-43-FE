import { useContext, useEffect } from "react";
import QuizContext from "../contexts/QuizContext";
import FormContext from "../contexts/FormContext";
import QuizList from "../components/Quiz/QuizList";
import FormList from "../components/Form/FormList";
import MainLayout from "../layouts/MainLayout";

function QuizForm() {
  const { getQuizzes } = useContext(QuizContext);
  const { getForms } = useContext(FormContext);

  useEffect(() => {
    getQuizzes(1);
  }, [getQuizzes]);

  useEffect(() => {
    getForms(1);
  }, [getForms]);

  return (
    <MainLayout>
      <QuizList />
      <FormList />
    </MainLayout>
  );
}

export default QuizForm;
