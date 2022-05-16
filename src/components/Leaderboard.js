import { connect } from "react-redux";

const Leaderboard = (props) => {
  return (
    <div className="pure-g leaderboard">
      <h1 className="pure-u-1 center">Leaderboard</h1>
      <table className="pure-u pure-table pure-table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>User</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {props.userObjects.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={user.avatarURL}
                  className="avatar"
                  alt={`${user.name}'s avatar`}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.answered}</td>
              <td>{user.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  const usersIds = Object.keys(users);
  const userObjects = usersIds
    .map((userId) => ({
      id: userId,
      avatarURL: users[userId].avatarURL,
      name: users[userId].name,
      answered: Object.keys(users[userId].answers).length,
      created: users[userId].questions.length,
    }))
    .sort((a, b) => b.created + b.answered - (a.created + a.answered));
  return { userObjects };
};

export default connect(mapStateToProps)(Leaderboard);
