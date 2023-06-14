import React, { useState } from "react";
import { Input, Typography, Button, Textarea } from "@material-tailwind/react";

const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const QuestionDialog = ({ field, index, quizContent, setQuizContent }) => {
  const [editFieldIndex, setEditFieldIndex] = useState(-1);
  const [textField, setTextField] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const editField = (index, question) => {
    setQuizContent((prevQuizContent) => {
      const updatedQuizContent = [...prevQuizContent];
      updatedQuizContent[index].question = question;
      return updatedQuizContent;
    });
  };

  const addFieldOption = (index, option) => {
    if (option && option !== "") {
      setQuizContent((prevQuizContent) => {
        const updatedQuizContent = [...prevQuizContent];
        updatedQuizContent[index].answers.push(option);
        updatedQuizContent[index].textField = "";

        if (selectedOption === option) {
          updatedQuizContent[index].key = option;
        }

        return updatedQuizContent;
      });
    }
  };

  const handleTextFieldChange = (e, index) => {
    const fieldValue = e.target.value;
    setTextField(fieldValue);

    setQuizContent((prevQuizContent) => {
      const updatedQuizContent = [...prevQuizContent];
      updatedQuizContent[index].textField = fieldValue;
      return updatedQuizContent;
    });
  };

  const toggleEditField = (index) => {
    setEditFieldIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleOptionChange = (index, option) => {
    setSelectedOption(option);

    setQuizContent((prevQuizContent) => {
      const updatedQuizContent = [...prevQuizContent];
      updatedQuizContent[index].key = option;
      return updatedQuizContent;
    });
  };

  const handleExplanationChange = (index, explanation) => {
    setQuizContent((prevQuizContent) => {
      const updatedQuizContent = [...prevQuizContent];
      updatedQuizContent[index].explanation = explanation;
      return updatedQuizContent;
    });
  };

  return (
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
            onChange={(e) => handleExplanationChange(index, e.target.value)}
          ></Textarea>
        </div>
      )}
    </div>
  );
};

export default QuestionDialog;
