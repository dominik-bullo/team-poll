import { connect } from "react-redux";
import CardComp from "./CardComp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CardSection = (props) => {
  return (
    <Box sx={{ mb: "2" }}>
      <Typography align="center" variant="h5" component="h2">
        {props.cardName}
      </Typography>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}
      >
        {props.ids.map((id) => (
          <CardComp key={id} id={id} />
        ))}
      </Box>
      {props.ids.length === 0 && (
        <Typography align="center" component="p" mt={2}>
          No questions left!
        </Typography>
      )}
    </Box>
  );
};

export default connect()(CardSection);
