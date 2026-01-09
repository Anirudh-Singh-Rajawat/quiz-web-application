import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function CreateQuiz() {
  const [category, setCategory] = useState("");
  const [numQ, setNumQ] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const createQuiz = () => {
    fetch(
      `http://localhost:8080/quiz/create?category=${category}&numQ=${numQ}&title=${title}`,
      { method: "POST" }
    )
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to create quiz");
        }
        return res.json();   // 🔥 THIS WAS MISSING
      })
      .then(quizId => {
        console.log("Quiz ID:", quizId); // 🔍 debug
        navigate(`/quiz/${quizId}`, { replace: true });
      })
      .catch(err => {
        console.error(err);
        alert("Error creating quiz");
      });
  };

  return (
    <div className="container">
      <h2>Create Quiz</h2>

      <input
        placeholder="Category (java / python)"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Questions"
        value={numQ}
        onChange={e => setNumQ(e.target.value)}
      />
      <input
        placeholder="Quiz Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <button onClick={createQuiz}>Create Quiz</button>
    </div>
  );
}

export default CreateQuiz;
