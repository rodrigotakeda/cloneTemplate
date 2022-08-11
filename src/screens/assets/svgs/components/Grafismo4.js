import * as React from "react";

function Grafismo4(props) {
  return (
    <svg viewBox="0 0 1920 2500">
      <path
        fill="#4dbbce"
        opacity={0.4}
        d="M503.42 2045.52H88.18v-452.24h415.24z"
      />
    </svg>
  );
}

const MemoGrafismo4 = React.memo(Grafismo4);
export default MemoGrafismo4;
