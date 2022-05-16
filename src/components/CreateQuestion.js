import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/shared";
import { useNavigate } from "react-router-dom";

const CreateQuestion = ({ id, dispatch }) => {
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleChange = (index) => (e) => {
    const newOptions = options.map((option, i) => {
      if (i === index) {
        return e.target.value;
      }
      return option;
    });
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(options[0], options[1], id));
    navigate("/");
  };

  return (
    <div className="pure-u-1 new-question center">
      <h2>New Question</h2>
      <h3>Would you rather...</h3>

      <form className="pure-form" onSubmit={handleSubmit}>
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="optOne">Option 1: </label>
            <input
              className="pure-input-2-3"
              type="text"
              id="optOne"
              value={options[0]}
              onChange={handleChange(0)}
              placeholder="Type your first option here..."
            />
          </div>
          <div className="pure-control-group x-margin">
            <label htmlFor="optTwo">Option 2: </label>
            <input
              className="pure-input-2-3"
              type="text"
              id="optTwo"
              value={options[1]}
              onChange={handleChange(1)}
              placeholder="Type your second option here..."
            />
          </div>
          <div className="pure-controls">
            <button
              className="pure-button pure-button-primary"
              disabled={options.includes("")}
              type="submit"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.authedUser,
  };
};

export default connect(mapStateToProps)(CreateQuestion);
