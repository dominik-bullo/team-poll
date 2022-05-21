import { connect } from "react-redux";
import { formatDate } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CardComp = ({ id, author, timestamp }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/questions/${id}`);
  };
  return (
    <Box sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
      <Card
        sx={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          minWidth: "355px",
        }}
      >
        <CardContent>
          <Typography fontFamily="monospace" variant="h5" component="h3">
            {id}
          </Typography>
          <Typography variant="body2" component="p">
            {author}
          </Typography>
          <Typography variant="body2" component="p">
            {timestamp}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            View
          </Button>
        </CardActions>
      </Card>
    </Box>
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

export default connect(mapStateToProps)(CardComp);
