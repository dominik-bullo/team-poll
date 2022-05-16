import { connect } from "react-redux";
import { useState } from "react";
import Question from "./Question";
import CardSection from "./CardSection";

const Questions = (props) => {
  const [selectedTab, setSelectedTab] = useState("");
  const handleChange = (e) => {
    setSelectedTab(e.target.value);
  };

  return (
    <div className="pure-g dashboard">
      <div className="pure-u">
        <label htmlFor="tab-select">Show:</label>
        <select
          name="userInput"
          id="selectTab"
          value={selectedTab}
          onChange={handleChange}
        >
          <option disabled value="">
            - select -
          </option>
          <option value={"open"}>open</option>
          <option value={"done"}>answered</option>
        </select>
      </div>
      {selectedTab !== "done" ? (
        <CardSection cardName="New Questions" ids={props.openQuestionIds} />
      ) : null}
      {selectedTab !== "open" ? (
        <CardSection cardName="Done" ids={props.answeredQuestionIds} />
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => {
  const questionIds = Object.keys(questions).sort((a, b) => {
    return questions[b].timestamp - questions[a].timestamp;
  });
  const answeredQuestionIds = questionIds.filter((questionId) => {
    const question = questions[questionId];
    return (
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    );
  });
  const openQuestionIds = questionIds.filter(
    (questionId) => !answeredQuestionIds.includes(questionId)
  );
  return {
    openQuestionIds,
    answeredQuestionIds,
  };
};

export default connect(mapStateToProps)(Questions);
