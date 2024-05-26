import { Container } from "react-bootstrap";
import LoginModel from "./components/LoginModel";
import NavBar from "./components/NavBar";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import SignUpModel from "./components/SignUpModel";
import { useEffect, useState } from "react";
import { User } from "./types/user";
import * as NotesApi from "./network/note_api";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

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
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModel(true)}
        onLogoutSuccessfull={() => setLoggedInUser(null)}
        onSignUpClicked={() => setShowSignUpModel(true)}
      />
      <Container>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
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
      </Container>
    </div>
  );
}

export default App;
