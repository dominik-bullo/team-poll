import { useState } from "react";
import { connect } from "react-redux";
import { handleSetAuthedUser } from "../actions/authedUser";

const Login = ({ users, dispatch }) => {
  const userIds = Object.keys(users);
  const [userId, setUserId] = useState("");

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleSetAuthedUser(userId));
  };

  return (
    <div className="pure-g login" data-testid="login">
      <img className="logo" src="letsvote.png" alt="vote" />
      <h1 className="pure-u-1 center">Login</h1>
      <form
        className="pure-u-1-4 pure-form pure-form-stacked"
        onSubmit={handleSubmit}
      >
        <label htmlFor="pet-select">Select user:</label>

        <select
          name="userInput"
          id="userInput"
          value={userId}
          onChange={handleChange}
          data-testid="user-select"
        >
          <option disabled value="">
            Select user
          </option>
          {userIds.map((userId) => (
            <option key={userId} value={userId}>
              {users[userId].name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={userId === ""}
          className="pure-button pure-button-primary"
          data-testid="login-button"
        >
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Login);
