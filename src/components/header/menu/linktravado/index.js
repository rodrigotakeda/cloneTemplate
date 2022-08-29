// React Elements/Hooks
import { Link } from "react-router-dom";

function LinkTravado(props) {
  if (props.trava === "travado") {
    return (
      `${props.content}`
    );
  } else {
    return (
      <Link to={`/${props.link}`}>{props.content}</Link>
    );
  }
}

export default LinkTravado;
