import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import UsersTable from "./pages/UsersTable";
import QuizFormPage from "./pages/QuizFormPage";
import CreateQuiz from "./pages/CreateQuiz";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/users" element={<UsersTable />} />
      <Route path="/forms" element={<QuizFormPage />} />
      <Route path="/createquiz" element={<CreateQuiz />} />
      <Route path="/updatePassword" element={<UpdatePasswordPage />} />
    </Routes>
  );
}

export default App;
