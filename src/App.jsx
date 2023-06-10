import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import UsersTable from "./pages/UsersTable";
import QuizFormPage from "./pages/QuizFormPage";
import CreateQuiz from "./pages/CreateQuiz";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import QuizTestPage from "./pages/QuizTestPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/users" element={<UsersTable />} />
      <Route path="/forms" element={<QuizFormPage />} />
      <Route path="/createquiz" element={<CreateQuiz />} />
      <Route path="/updatepassword" element={<UpdatePasswordPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/quiztest" element={<QuizTestPage />} />
    </Routes>
  );
}

export default App;
