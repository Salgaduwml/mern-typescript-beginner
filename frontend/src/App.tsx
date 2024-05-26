import { useEffect, useState } from "react";
import LoginModel from "./components/LoginModel";
import NavBar from "./components/NavBar";
import SignUpModel from "./components/SignUpModel";
import * as NotesApi from "./network/note_api";
import { User } from "./types/user";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Container } from "react-bootstrap";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModel, setShowSignUpModel] = useState(false);
  const [showLoginModel, setShowLoginModel] = useState(false);

  useEffect(() => {
    async function fechLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fechLoggedInUser();
  }, []);
  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModel(true)}
          onLogoutSuccessfull={() => setLoggedInUser(null)}
          onSignUpClicked={() => setShowSignUpModel(true)}
        />
        <Container className="pt-5">
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>
        {showSignUpModel && (
          <SignUpModel
            onDismiss={() => setShowSignUpModel(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModel(false);
            }}
          />
        )}
        {showLoginModel && (
          <LoginModel
            onDismiss={() => setShowLoginModel(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModel(false);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
