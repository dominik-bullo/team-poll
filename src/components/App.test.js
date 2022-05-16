import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";

import store from "../store/store";
import CreateQuestion from "./CreateQuestion";
import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import App from "../components/App";
import Leaderboard from "../components/Leaderboard";

describe("_saveQuestion (function)", () => {
  it("the saved question is returned and all expected fields are populated when correctly formatted data is passed", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "someUser",
    };
    const result = await _saveQuestion(question);
    expect(result).toEqual({
      id: expect.any(String),
      timestamp: expect.any(Number),
      author: question.author,
      optionOne: {
        votes: [],
        text: question.optionOneText,
      },
      optionTwo: {
        votes: [],
        text: question.optionTwoText,
      },
    });
  });
  it("an error is returned if incorrect data is passed", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
    };
    const result = _saveQuestion(question);
    await expect(result).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer (function)", () => {
  it("true is returned when correctly formatted data is passed", async () => {
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";
    const result = await _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    });
    expect(result).toEqual(true);
  });
  it("an error is returned if incorrect data is passed", async () => {
    const authedUser = "sarahedo";
    const answer = "optionOne";
    const result = _saveQuestionAnswer({
      authedUser,
      answer,
    });
    await expect(result).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});

describe("App (component)", () => {
  it("displays user selection at login", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const input = view.getByTestId("user-select");
    expect(input).toBeInTheDocument();
  });
  it("displays button at login", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const button = view.getByTestId("login-button");
    expect(button).toBeInTheDocument();
  });
});

describe("CreateQuestion (component)", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateQuestion />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("changes to input field are reflected in state", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateQuestion />
        </BrowserRouter>
      </Provider>
    );
    const optionOneInput = getByTestId("option-one");
    const optionTwoInput = getByTestId("option-two");
    fireEvent.change(optionOneInput, { target: { value: "Option One" } });
    fireEvent.change(optionTwoInput, { target: { value: "Option Two" } });
    expect(optionOneInput.value).toBe("Option One");
    expect(optionTwoInput.value).toBe("Option Two");
  });

  it("allows submission only if all fields are filled", async () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateQuestion />
        </BrowserRouter>
      </Provider>
    );
    const submitButton = view.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();
    const optionOneInput = view.getByTestId("option-one");
    const optionTwoInput = view.getByTestId("option-two");
    fireEvent.change(optionOneInput, { target: { value: "Option One" } });
    fireEvent.change(optionTwoInput, { target: { value: "Option Two" } });
    expect(submitButton).not.toBeDisabled();
  });
});

describe("Leaderboard (component)", () => {
  it("shows table", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );
    const table = view.getByTestId("leaderboard-table");
    expect(table).toBeInTheDocument();
  });
});
