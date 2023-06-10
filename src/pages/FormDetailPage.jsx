import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import MainLayout from "../layouts/MainLayout";
import QuestionList from "../components/Question/QuestionList";

function FormDetail() {
  const [form, setForm] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getForm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/v1/forms/${id}`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        console.log(response.data.data.form);
        setForm(response.data.data.form);
      } catch (err) {
        console.error(err);
      }
    };
    getForm();
  }, [id]);

  //Đợi useEffect chạy
  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MainLayout>
        <Button className="my-3">Get Attendace List</Button>
        <Typography className="my-3">Bài kiểm tra: {form.name}</Typography>
        <QuestionList questions={form.quiz.questions} />
      </MainLayout>
    </div>
  );
}

export default FormDetail;
