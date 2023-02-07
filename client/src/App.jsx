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
          element={
            <Redirect>
              <HomePage theme={theme} switchTheme={switchTheme} />
            </Redirect>
          }
        />

        <Route path="/auth-login" element={<LoginPage />} />
        <Route path="/auth-register" element={<RegisterPage />} />
        <Route path="/auth-changepassword" element={<ChangePassword />} />
        <Route path="/logout" element={<LogOutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
