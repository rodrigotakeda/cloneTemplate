import * as React from "react";

function Grafismo3(props) {
  return (
    <svg viewBox="0 0 1920 2500">
      <path
        fill="#4dbbce"
        opacity={0.4}
        d="M1191.32 2148.14H151.22V1894.5h1040.1z"
      />
    </svg>
  );
}

const MemoGrafismo3 = React.memo(Grafismo3);
export default MemoGrafismo3;
