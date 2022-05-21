import { connect } from "react-redux";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

const Leaderboard = (props) => {
  return (
    <Box>
      <Typography align="center" variant="h5" component="h2" mb={2}>
        Leaderboard
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Answered</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.userObjects.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar src={user.avatarURL} alt={`${user.name}'s avatar`} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.answered}</TableCell>
                <TableCell>{user.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
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
