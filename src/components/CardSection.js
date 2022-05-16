import { connect } from "react-redux";
import Card from "./Card";

const CardSection = (props) => {
  return (
    <div className="pure-u-1 center section-container">
      <h3>{props.cardName}</h3>
      <div className="pure-g card-section">
        {props.ids.map((id) => (
          <Card key={id} id={id} />
        ))}
        {props.ids.length === 0 && <p className="pure-u">No questions left!</p>}
      </div>
    </div>
  );
};

export default connect()(CardSection);
