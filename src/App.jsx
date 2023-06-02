import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UsersTable from "./pages/UsersTable";
import QuizFormPage from "./pages/QuizFormPage";
import UserProvider from "./provider/UserProvider.jsx";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/users"
        element={
          <UserProvider>
            <UsersTable />
          </UserProvider>
        }
      />
      <Route path="/forms" element={<QuizFormPage />} />
    </Routes>
  );
}

export default App;
