import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleSetAuthedUser } from "../actions/authedUser";

const Nav = ({ authedUser, users, dispatch }) => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(handleSetAuthedUser(null));
    navigate("/");
  };

  return (
    <nav className="header" data-testid="navbar">
      <div className="pure-menu pure-menu-horizontal">
        <div className="pure-u-2-3">
          <div className="pure-menu-heading title">Team Poll</div>
          <ul className="pure-menu-list">
            <li className="pure-menu-item">
              <Link className="pure-menu-link" to="/">
                Home
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link className="pure-menu-link" to="/add">
                New Question
              </Link>
            </li>
            <li className="pure-menu-item">
              <Link className="pure-menu-link" to="/leaderboard">
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>
        <div className="pure-u-1-3 pure-g nav-user">
          <div className="pure-menu-item menu-profile pure-u-1-3">
            <img
              className="avatar"
              src={users[authedUser].avatarURL}
              alt={users[authedUser].name}
            />
          </div>
          <div className="pure-menu-item menu-profile pure-u-2-3">
            {authedUser}
            <br />
            <button onClick={handleLogout} className="pure-button btn-small">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps)(Nav);
