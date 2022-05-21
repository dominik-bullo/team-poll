import { useState } from "react";
import { connect } from "react-redux";
import { handleSetAuthedUser } from "../actions/authedUser";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

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
    <Grid
      container
      maxWidth={1100}
      p={4}
      mx="auto"
      alignItems="center"
      data-testid="login"
    >
      <Grid item xs={1}></Grid>
      <Grid item xs={1} justifyContent="center">
        <Avatar src="letsvote.png" alt="let's vote" />
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h4" component="h1">
          Login
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
            m={2}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0px 0px 5px #ccc",
            }}
          >
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <InputLabel id="select-outlined-label">Select User</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                value={userId}
                onChange={handleChange}
                label="Select User"
              >
                {userIds.map((userId) => (
                  <MenuItem key={userId} value={userId}>
                    {users[userId].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginLeft: "1rem" }}
              data-testid="submit-button"
            >
              Login
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Login);
