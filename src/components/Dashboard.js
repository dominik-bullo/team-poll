import { connect } from "react-redux";
import { useState } from "react";
import CardSection from "./CardSection";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Questions = (props) => {
  const [selectedTab, setSelectedTab] = useState("open");
  const handleChange = (e) => {
    setSelectedTab(e.target.value);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" my={2}>
        <ToggleButtonGroup
          size="small"
          color="primary"
          value={selectedTab}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="open">Open</ToggleButton>
          <ToggleButton value="done">Done</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {selectedTab !== "done" ? (
        <CardSection cardName="Open Questions" ids={props.openQuestionIds} />
      ) : null}
      {selectedTab !== "open" ? (
        <CardSection cardName="Done" ids={props.answeredQuestionIds} />
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => {
  const questionIds = Object.keys(questions).sort((a, b) => {
    return questions[b].timestamp - questions[a].timestamp;
  });
  const answeredQuestionIds = questionIds.filter((questionId) => {
    const question = questions[questionId];
    return (
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    );
  });
  const openQuestionIds = questionIds.filter(
    (questionId) => !answeredQuestionIds.includes(questionId)
  );
  return {
    openQuestionIds,
    answeredQuestionIds,
  };
};

export default connect(mapStateToProps)(Questions);
