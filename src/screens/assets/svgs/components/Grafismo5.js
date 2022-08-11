import * as React from "react";

function Grafismo5(props) {
  return (
    <svg viewBox="0 0 1920 2500">
      <path
        fill="#4dbbce"
        opacity={0.4}
        d="M552.07 393.7h247.21v138.48H552.07z"
      />
    </svg>
  );
}

const MemoGrafismo5 = React.memo(Grafismo5);
export default MemoGrafismo5;
