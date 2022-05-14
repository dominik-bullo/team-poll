import { connect } from "react-redux";
import Card from "./Card";

const CardSection = (props) => {
  return (
    <div className="card-section">
      <h3 className="center">{props.cardName}</h3>
      <ul className="card-list">
        {props.ids.map((id) => (
          <Card key={id} id={id} />
          //   <span>Hi There</span>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ ids }) => {
  return {
    ids,
  };
};

export default connect()(CardSection);
