import React, { useState } from "react";
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [quizContent, setQuizContent] = useState([]);
  const [editFieldIndex, setEditFieldIndex] = useState(-1);
  const [textField, setTextField] = useState("");
  const [explanation, setExplanation] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const addQuestion = () => {
    const newQuestion = {
      question_type: "multichoice",
      question: "",
      answers: [],
      key: "",
      explanation: "",
    };
    setQuizContent([...quizContent, newQuestion]);
  };

  const editField = (index, question) => {
    const updatedQuizContent = [...quizContent];
    updatedQuizContent[index].question = question;
    setQuizContent(updatedQuizContent);
  };

  const addFieldOption = (index, option) => {
    if (option && option !== "") {
      const updatedQuizContent = [...quizContent];
      updatedQuizContent[index].answers.push(option);
      updatedQuizContent[index].textField = "";

      if (selectedOption === option) {
        updatedQuizContent[index].key = option;
      }

      setQuizContent(updatedQuizContent);
    }
  };

  const handleTextFieldChange = (e, index) => {
    const fieldValue = e.target.value;
    setTextField(fieldValue);

    const updatedQuizContent = [...quizContent];
    updatedQuizContent[index].textField = fieldValue;
    setQuizContent(updatedQuizContent);
  };

  const toggleEditField = (index) => {
    if (editFieldIndex === index) {
      setEditFieldIndex(-1);
    } else {
      setEditFieldIndex(index);
    }
  };

  const handleOptionChange = (index, option) => {
    setSelectedOption(option);

    const updatedQuizContent = [...quizContent];
    updatedQuizContent[index].key = option;
    setQuizContent(updatedQuizContent);
  };

  const handleExplanationChange = (index, explanation) => {
    const updatedQuizContent = [...quizContent];
    updatedQuizContent[index].explanation = explanation;
    setQuizContent(updatedQuizContent);
  };

  const handleSubmit = async () => {
    try {
      const response_createQuiz = await axios.post(
        "http://localhost:9000/api/v1/quizzes",
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
        `http://localhost:9000/api/v1/quizzes/${id}/questions`,
        {
          questions: questions,
        },
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-start items-center px-4 max-w-screen-xl w-full space-y-4 mt-6">
        <div className="flex flex-col px-4 bg-white rounded-md justify-center item-start w-full shadow-sm border-blue-600 border-t-8 space-y-2 h-24">
          <Input
            size="lg"
            type="text"
            className="text-3xl font-semibold"
            label="Tên quiz"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </div>

        <div className="relative flex flex-col w-full space-y-4">
          {quizContent.map((field, index) => (
            <div
              key={index}
              className="rounded-md bg-white flex w-full shadow-md px-4 border-2 border-blue-100"
            >
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center space-y-2">
                  <div className="block text-sm font-medium text-gray-700 capitalize pt-3">
                    {editFieldIndex === index ? (
                      <Input
                        type="text"
                        label="Câu hỏi"
                        value={field.question}
                        onChange={(e) => editField(index, e.target.value)}
                        onBlur={() => toggleEditField(-1)}
                      />
                    ) : (
                      <Typography
                        onClick={() => toggleEditField(index)}
                        style={{ textTransform: "none", cursor: "pointer" }}
                        className="ml-2"
                      >
                        {field.question ? field.question : "Câu hỏi"}
                      </Typography>
                    )}
                  </div>
                </div>

                {field.question_type === "multichoice" && (
                  <div className="my-4 flex flex-col space-y-2">
                    {field.answers.map((item, answerIndex) => (
                      <div
                        key={answerIndex}
                        className="flex space-between items-center ml-1"
                      >
                        <label className="flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-5 w-5 text-indigo-600"
                            name={`question-${index}`}
                            checked={field.key === item}
                            onChange={() => handleOptionChange(index, item)}
                          />
                          <span className="ml-2">{`${options[answerIndex]}. ${item}`}</span>
                        </label>
                      </div>
                    ))}
                    <div className="py-2 flex space-between">
                      <Input
                        type="text"
                        onChange={(e) => handleTextFieldChange(e, index)}
                        value={field.textField || ""}
                        label="Thêm lựa chọn"
                        className="flex-1"
                      />
                      <Button
                        className="block hover:bg-indigo-900 text-white px-4 ml-5"
                        onClick={() => addFieldOption(index, field.textField)}
                      >
                        Thêm
                      </Button>
                    </div>
                    <Textarea
                      rows="3"
                      className="w-full"
                      label="Giải thích"
                      value={field.explanation}
                      onChange={(e) =>
                        handleExplanationChange(index, e.target.value)
                      }
                    ></Textarea>
                  </div>
                )}
              </div>
            </div>
          ))}
          <Link to="/forms">
            <Button
              onClick={handleSubmit}
              className="w-full block hover:bg-indigo-900 text-white px-4"
            >
              Lưu
            </Button>
          </Link>
          <div
            className="sticky xl:absolute bottom-10 -right-16 flex flex-col items-center bg-white p-2 rounded-md shadow-md"
            title="Thêm câu hỏi"
          >
            <button onClick={addQuestion}>
              <PlusCircleIcon className="w-8 h-8 text-gray-400 hover:text-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateQuiz;
