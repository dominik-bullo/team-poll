import { connect } from "react-redux";
import { formatDate } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,
  author,
  optionOne,
  optionTwo,
  authedUser,
  hasVoted,
  timestamp,
}) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    // TODO: navigate to question page
    navigate(`/questions/${id}`);
  };
  return (
    <div className="pure-u-1 pure-u-md-1-3 pure-u-lg-1-5 card">
      <h4>{author}</h4>
      <br />
      <p>{timestamp}</p>
      <br />

      <button onClick={handleClick} className="pure-button">
        Show
      </button>
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
    id,
    author,
    optionOne,
    optionTwo,
    authedUser,
    hasVoted,
    timestamp,
  };
};

export default connect(mapStateToProps)(Card);
