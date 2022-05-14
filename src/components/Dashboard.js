import { connect } from "react-redux";
import Question from "./Question";
import CardSection from "./CardSection";

const Questions = (props) => {
  return (
    <div className="container">
      <CardSection cardName="New Questions" ids={props.openQuestionIds} />
      <CardSection cardName="Done" ids={props.answeredQuestionIds} />
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
