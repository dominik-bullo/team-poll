import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { Route, Routes } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import Nav from "./Nav";
import Dashboard from "./Dashboard";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <>
      <Nav />
      <LoadingBar />
      {props.loading === true ? null : (
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
        </Routes>
      )}
    </>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
