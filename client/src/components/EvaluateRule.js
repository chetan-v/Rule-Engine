import React, { useState } from "react";
import axios from "axios";

function EvaluateRule() {
  const [astInput, setAstInput] = useState(""); // Keep raw input as a string
  const [inputDataInput, setInputDataInput] = useState(""); // Keep raw input as a string
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleEvaluateRule = async (e) => {
    e.preventDefault();
    try {
      // Parse the inputs to JSON only on form submission
      const ast = JSON.parse(astInput);
      const inputData = JSON.parse(inputDataInput);

      const response = await axios.post(
        "http://localhost:5000/api/rules/evaluate",
        {
          ast,
          inputData,
        }
      );
      setResult(response.data.result);
      setError(null); // Clear any previous error
    } catch (error) {
      setError(
        "Invalid JSON format or evaluation error. Please check your inputs."
      );
      console.error("Error evaluating rule:", error);
    }
  };

  return (
    <div>
      <h2>Evaluate Rule</h2>
      <form onSubmit={handleEvaluateRule}>
        <textarea
          value={astInput}
          onChange={(e) => setAstInput(e.target.value)} // Just store the input as a string
          placeholder="Paste the combined AST here (JSON format)"
        />

        <textarea
          value={inputDataInput}
          onChange={(e) => setInputDataInput(e.target.value)} // Just store the input as a string
          placeholder="Enter input data (JSON format)"
        />

        <button type="submit">Evaluate Rule</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result !== null && <p>Result: {result.toString()}</p>}
    </div>
  );
}

export default EvaluateRule;
