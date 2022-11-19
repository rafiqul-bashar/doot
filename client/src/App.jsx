import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Redirect from "./components/Redirtect";
import {
  ChangePassword,
  HomePage,
  LoginPage,
  LogOutPage,
  NotFoundPage,
  RegisterPage,
} from "./pages";

function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage theme={theme} switchTheme={switchTheme} />}
        />

        <Route
          path="/auth-login"
          element={
            <Redirect>
              <LoginPage />
            </Redirect>
          }
        />
        <Route
          path="/auth-register"
          element={
            <Redirect>
              <RegisterPage />
            </Redirect>
          }
        />
        <Route
          path="/auth-changepassword"
          element={
            <Redirect>
              {" "}
              <ChangePassword />{" "}
            </Redirect>
          }
        />
        <Route
          path="/logout"
          element={
            <Redirect>
              {" "}
              <LogOutPage />
            </Redirect>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
