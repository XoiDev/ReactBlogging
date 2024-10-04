import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "pages/SignInPage";
import Homepage from "pages/Homepage";
import NotFoundPage from "pages/NotFoundPage";
import DashboardLayout from "module/dashboard/DashboardLayout";
import DashboardPage from "pages/DashboardPage";

function App() {
  return <div>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
          </Route>
      </Routes>
    </AuthProvider>
  </div>;
}

export default App;
