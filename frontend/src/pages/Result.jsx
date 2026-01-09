import { useLocation } from "react-router-dom";
import "../App.css";

function Result() {
  const params = new URLSearchParams(useLocation().search);
  const score = Number(params.get("score"));

  return (
    <div className="container">
      <h2>Result</h2>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Your Score: {score}
      </h1>
    </div>
  );
}

export default Result;
