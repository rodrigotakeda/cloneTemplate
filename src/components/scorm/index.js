import React from "react";
import { withScorm } from "react-scorm-provider";

const Props = (props) => {
  return (
    <div>
      <p>Welcome, {props.sco.learnerName}!</p>
      <p>Your course status is currently: {props.sco.completionStatus}</p>
      <p>Click the button below to complete the course!</p>
      <button onClick={() => props.sco.setStatus("completed")}>
        Mark me complete!
      </button>
    </div>
  );
};

const ScoProps = withScorm()(Props);
export default ScoProps;