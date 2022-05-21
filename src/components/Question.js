import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/shared";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

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
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        p={2}
        mx="auto"
        spacing={2}
        sx={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px #ccc",
        }}
      >
        <Grid item xs={12} align="center">
          <Avatar src={props.avatarURL} alt="avatar" />
          <Typography variant="h5" component="h2" sx={{ marginTop: "1em" }}>
            {props.author.name} asks:
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h2" sx={{ marginTop: "1em" }}>
            Would you rather...
          </Typography>
        </Grid>
        <Grid item xs={6} align="center">
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                {props.optionOne.text}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                id="optionOne"
                variant="contained"
                color="primary"
                disabled={props.hasVotedOption !== null}
                className={`pure-button pure-button-primary${
                  props.hasVotedOption === "optionOne" ? " voted" : ""
                }`}
                onClick={handleVote}
              >
                {props.hasVotedOption === "optionOne"
                  ? "Voted for this"
                  : "Vote"}
              </Button>
              {props.hasVotedOption && (
                <>
                  <Typography variant="body2" component="p" ml={2}>
                    {`${Math.round(
                      (100 /
                        (props.votesForOptionOne + props.votesForOptionTwo)) *
                        props.votesForOptionOne
                    )}%`}
                  </Typography>
                  <Typography variant="body2" component="p" ml={2}>
                    <HowToVoteIcon />
                    {props.votesForOptionOne}
                  </Typography>
                </>
              )}
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} align="center">
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                {props.optionTwo.text}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                id="optionTwo"
                variant="contained"
                color="primary"
                disabled={props.hasVotedOption !== null}
                className={`pure-button pure-button-primary${
                  props.hasVotedOption === "optionTwo" ? " voted" : ""
                }`}
                onClick={handleVote}
              >
                {props.hasVotedOption === "optionTwo"
                  ? "Voted for this"
                  : "Vote"}
              </Button>
              {props.hasVotedOption && (
                <>
                  <Typography variant="body2" component="p" ml={2}>
                    {`${Math.round(
                      (100 /
                        (props.votesForOptionOne + props.votesForOptionTwo)) *
                        props.votesForOptionTwo
                    )}%`}
                  </Typography>
                  <Typography variant="body2" component="p" ml={2}>
                    <HowToVoteIcon />
                    {props.votesForOptionTwo}
                  </Typography>
                </>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
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
