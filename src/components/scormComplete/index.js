

// React Elements/Hooks
import { useEffect } from "react";
import  { withScorm } from 'react-scorm-provider';

function ScormComplete(props) {

  useEffect(() => {
    props.sco.setStatus("completed")
  }, []);
  
    return (
      <div className="sr-only">Complete</div>
    );  
}

export const ScoLearner = withScorm()(ScormComplete)

export default ScormComplete;