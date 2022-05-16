import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
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

describe("_saveQuestionAnswer", () => {
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
