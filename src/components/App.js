import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { Route, Routes } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Question from "./Question";
import CreateQuestion from "./CreateQuestion";
import Leaderboard from "./Leaderboard";
import Login from "./Login";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <>
      {props.loading === true ? null : <Nav />}
      <LoadingBar />
      {props.loading !== true ? null : <Login />}
      {props.loading === true ? null : (
        <Routes>
          <Route path="*" element={<p className="center">404 Not Found!</p>} />
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/add" exact element={<CreateQuestion />} />
          <Route path="/leaderboard" exact element={<Leaderboard />} />
          <Route path="/questions/:id" element={<Question />} />
        </Routes>
      )}
    </>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
