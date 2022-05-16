import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/shared";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Question = (props) => {
  const handleVote = (e) => {
    e.preventDefault();
    props.dispatch(handleAddAnswer(props.authedUser, props.id, e.target.id));
  };
  return props.id !== null ? (
    <div className="question pure-g center">
      <div className="pure-g pure-u-1">
        <img className="avatar-lg" src={props.avatarURL} alt="avatar" />
        <h3>{props.author.name} asks:</h3>
        <h4>Would you rather</h4>
      </div>
      <div className="pure-g pure-u-1">
        <div className="pure-u-1-2">
          <p>{props.optionOne.text}</p>
          <br />
          <button
            id="optionOne"
            disabled={props.hasVotedOption !== null}
            className={`pure-button pure-button-primary${
              props.hasVotedOption === "optionOne" ? " voted" : ""
            }`}
            onClick={handleVote}
          >
            {props.hasVotedOption === "optionOne" ? "Voted for this" : "Vote"}
          </button>
          <br />
          {props.hasVotedOption && (
            <div>
              <p>
                {`${Math.round(
                  (100 / (props.votesForOptionOne + props.votesForOptionTwo)) *
                    props.votesForOptionOne
                )}%`}
              </p>
              <p>Votes: {props.votesForOptionOne}</p>
            </div>
          )}
        </div>
        <div className="pure-u-1-2">
          <p>{props.optionTwo.text}</p>
          <br />
          <button
            id="optionTwo"
            disabled={props.hasVotedOption !== null}
            className={`pure-button pure-button-primary${
              props.hasVotedOption === "optionTwo" ? " voted" : ""
            }`}
            onClick={handleVote}
          >
            {props.hasVotedOption === "optionTwo" ? "Voted for this" : "Vote"}
          </button>
          <br />
          {props.hasVotedOption && (
            <div>
              <p>
                {`${Math.round(
                  (100 / (props.votesForOptionOne + props.votesForOptionTwo)) *
                    props.votesForOptionTwo
                )}%`}
              </p>
              <p>Votes: {props.votesForOptionTwo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <p className="center">404 Not Found!</p>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.router.params;
  if (!questions[id]) {
    return {
      id: null,
    };
  }

  const question = questions[id];
  const author = users[question.author];
  const avatarURL = author.avatarURL;
  const optionOne = question.optionOne;
  const optionTwo = question.optionTwo;
  const votesForOptionOne = optionOne.votes.length;
  const votesForOptionTwo = optionTwo.votes.length;
  const hasVotedOption = () => {
    if (optionOne.votes.includes(authedUser)) {
      return "optionOne";
    }
    if (optionTwo.votes.includes(authedUser)) {
      return "optionTwo";
    }
    return null;
  };
  return {
    author,
    avatarURL,
    optionOne,
    optionTwo,
    authedUser,
    hasVotedOption: hasVotedOption(),
    id,
    votesForOptionOne,
    votesForOptionTwo,
  };
};

export default withRouter(connect(mapStateToProps)(Question));
