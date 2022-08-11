import * as React from "react";

function Grafismo6(props) {
  return (
    <svg viewBox="0 0 1920 2500">
      <path fill="#4dbbce" opacity={0.4} d="M108.63 263.78h769v199.15h-769z" />
    </svg>
  );
}

const MemoGrafismo6 = React.memo(Grafismo6);
export default MemoGrafismo6;
