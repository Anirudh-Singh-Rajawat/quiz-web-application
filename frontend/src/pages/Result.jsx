import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const score = location.state?.score ?? 0;

  return (
    <div className="container">
      <h2>Result</h2>
      <h3>Your Score: {score}</h3>
    </div>
  );
}

export default Result;
