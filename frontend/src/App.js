import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";

import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import Header from "./components/Header";
import AuthContext from "./store/auth-context";
import AuthPage from "./pages/AuthPage/AuthPage";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      {isLoggedIn && <Header />}

      <Container style={{ paddingTop: "30px" }}>
        <Switch>
          {isLoggedIn ? (
            <Route path="/" exact>
              <MainPage />
            </Route>
          ) : (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}

          <Route path="*">
            <Redirect to={isLoggedIn ? "/" : "/auth"} />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
