import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

function Quiz() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/quiz/get/${id}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [id]);

  const selectAnswer = (qid, value) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.id !== qid);
      return [...filtered, { id: qid, response: value }];
    });
  };

  const submitQuiz = () => {
    fetch(`http://localhost:8080/quiz/submit/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
      .then((res) => res.json())
      .then((score) => {
        navigate(`/result?score=${score}`, { replace: true });
      });
  };

  return (
    <div className="container">
      <h2>Quiz</h2>

      {questions.map((q, index) => (
        <div className="question-card" key={q.id}>
          <p>{index + 1}. {q.questionTitle}</p>

          {[q.option1, q.option2, q.option3, q.option4].map((opt) => (
            <label className="option" key={opt}>
              {/* LEFT SIDE: option text */}
              <span>{opt}</span>

              {/* RIGHT SIDE: radio button */}
              <input
                type="radio"
                name={`q${q.id}`}
                onChange={() => selectAnswer(q.id, opt)}
              />
            </label>
          ))}
        </div>
      ))}

      <button onClick={submitQuiz}>Submit Quiz</button>
    </div>
  );
}

export default Quiz;
