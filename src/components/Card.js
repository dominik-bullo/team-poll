import { connect } from "react-redux";
import { formatDate } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const Card = ({ id, author, timestamp }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/questions/${id}`);
  };
  return (
    <div className="pure-u-1 pure-u-md-1-3 pure-u-lg-1-5 card">
      <h4 data-testid="author">{author}</h4>
      <br />
      <p data-testid="timestamp">{timestamp}</p>
      <br />

      <button
        onClick={handleClick}
        className="pure-button"
        data-testid="show-button"
      >
        Show
      </button>
    </div>
  );
};

const mapStateToProps = ({ users, questions }, { id }) => {
  const question = questions[id];
  const author = users[question.author].id;
  const timestamp = formatDate(question.timestamp);

  return {
    id,
    author,
    timestamp,
  };
};

export default connect(mapStateToProps)(Card);
