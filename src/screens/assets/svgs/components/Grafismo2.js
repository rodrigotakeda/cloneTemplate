import * as React from "react";

function Grafismo2(props) {
  return (
    <svg viewBox="0 0 1920 2500">
      <path
        fill="#4dbbce"
        opacity={0.4}
        d="M1116.34 397.98h414.58v232.23h-414.58z"
      />
    </svg>
  );
}

const MemoGrafismo2 = React.memo(Grafismo2);
export default MemoGrafismo2;
