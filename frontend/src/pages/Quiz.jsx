useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/quiz/get/${id}`)
    .then(res => res.json())
    .then(data => setQuestions(data));
}, [id]);
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/quiz/get/${id}`)
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, [id]);

  const handleOptionChange = (questionId, answer) => {
    setResponses(prev => {
      const filtered = prev.filter(r => r.id !== questionId);
      return [...filtered, { id: questionId, response: answer }];
    });
  };

  const submitQuiz = () => {
    fetch(`${import.meta.env.VITE_API_URL}/quiz/submit/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responses)
    })
      .then(res => res.json())
      .then(score => {
        navigate("/result", { state: { score }, replace: true });
      });
  };

  return (
    <div className="container">
      <h2>Quiz</h2>

      {questions.map(q => (
        <div key={q.id}>
          <h4>{q.questionTitle}</h4>

          {[q.option1, q.option2, q.option3, q.option4].map((opt, index) => (
            <div key={index}>
              <input
                type="radio"
                name={q.id}
                value={opt}
                onChange={() => handleOptionChange(q.id, opt)}
              />
              {opt}
            </div>
          ))}
        </div>
      ))}

      <button onClick={submitQuiz}>Submit Quiz</button>
    </div>
  );
}

export default Quiz;
