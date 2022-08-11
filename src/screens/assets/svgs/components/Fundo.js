import * as React from "react";

function Fundo(props) {
  return (
    <svg viewBox="0 0 1920 2500">
      <path fill="#eddcc3" d="M0 0h1920v2500H0z" />
    </svg>
  );
}

const MemoFundo = React.memo(Fundo);
export default MemoFundo;
