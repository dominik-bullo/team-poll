import { connect } from "react-redux";
import { formatDate } from "../utils/helper";

const Card = ({
  author,
  optionOne,
  optionTwo,
  authedUser,
  hasVoted,
  timestamp,
}) => {
  return (
    <div className="card center">
      {author}
      <br />
      {timestamp}
      <hr />
      <button>Show</button>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  const author = users[question.author].id;
  const optionOne = question.optionOne;
  const optionTwo = question.optionTwo;
  const timestamp = formatDate(question.timestamp);

  const hasVoted =
    optionOne.votes.includes(authedUser) ||
    optionTwo.votes.includes(authedUser);

  return {
    author,
    optionOne,
    optionTwo,
    authedUser,
    hasVoted,
    timestamp,
  };
};

export default connect(mapStateToProps)(Card);
