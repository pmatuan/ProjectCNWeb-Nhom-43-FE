import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import UsersTable from "./pages/table/UsersTable";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/users" element={<UsersTable />} />
    </Routes>
  );
}

export default App;
