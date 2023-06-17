import { Input } from "@material-tailwind/react";
function QuizNameDialog({ name, setQuizName }) {
  return (
    <div className="flex flex-col px-4 bg-white rounded-md justify-center item-start w-full shadow-sm border-blue-600 border-t-8 space-y-2 h-24">
      <Input
        size="lg"
        type="text"
        className="text-3xl font-semibold"
        label="Tên quiz"
        value={name}
        onChange={(e) => setQuizName(e.target.value)}
      />
    </div>
  );
}

export default QuizNameDialog;
