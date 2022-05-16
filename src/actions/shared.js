import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { setAuthedUser } from "./authedUser";
import { receiveQuestions, addQuestion, addAnswer } from "./questions";
import { receiveUsers, addUserQuestion, addUserAnswer } from "./users";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      // dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, id) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: id,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addUserQuestion(question));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
      .then(() => {
        dispatch(addAnswer(authedUser, qid, answer));
        dispatch(addUserAnswer(authedUser, qid, answer));
      })
      .then(() => dispatch(hideLoading()));
  };
}
