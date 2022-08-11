import * as React from "react";

function Grafismo1(props) {
  return (
    <svg viewBox="0 0 1920 2500">
      <path
        fill="#4dbbce"
        opacity={0.4}
        d="M1350.06 558.92h505.73v414.07h-505.73z"
      />
    </svg>
  );
}

const MemoGrafismo1 = React.memo(Grafismo1);
export default MemoGrafismo1;
