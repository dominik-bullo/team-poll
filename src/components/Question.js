import { connect } from "react-redux";

const Question = (props) => {
  return (
    <div className="question-card">
      <div className="question-text">Would you rather...</div>
      <div className="question-options container">
        <div className="question-option container">
          <span className="question-option-text">{props.optionOne.text}</span>
          <span className="question-option-count">
            {props.optionOne.votes.length}
          </span>
        </div>
        <div className="question-option">
          <span className="question-option-text">{props.optionTwo.text}</span>
          <span className="question-option-count">
            {props.optionTwo.votes.length}
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  const author = users[question.author];
  const optionOne = question.optionOne;
  const optionTwo = question.optionTwo;
  const hasVoted =
    optionOne.votes.includes(authedUser) ||
    optionTwo.votes.includes(authedUser);

  return {
    author,
    optionOne,
    optionTwo,
    authedUser,
    hasVoted,
  };
};

export default connect(mapStateToProps)(Question);
