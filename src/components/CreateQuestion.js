import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/shared";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

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
    <Box>
      <Typography variant="h5" component="h2" align="center">
        New Question
      </Typography>
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
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" component="h2" align="center">
            Would you rather...
          </Typography>
          <FormControl
            variant="outlined"
            sx={{
              width: "100%",
              marginTop: "1rem",
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
          >
            <TextField
              id="optOne"
              label="Option 1"
              value={options[0]}
              onChange={handleChange(0)}
              placeholder="Type your first option here..."
              data-testid="option-one"
            />

            <TextField
              id="optTwo"
              label="Option 2"
              value={options[1]}
              onChange={handleChange(1)}
              placeholder="Type your second option here..."
              data-testid="option-two"
            />
          </FormControl>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              disabled={options.includes("")}
              type="submit"
              variant="contained"
              color="primary"
              data-testid="submit-button"
              sx={{ marginTop: "1rem" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.authedUser,
  };
};

export default connect(mapStateToProps)(CreateQuestion);
