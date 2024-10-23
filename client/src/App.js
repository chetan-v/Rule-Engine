import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [ruleString, setRuleString] = useState("");
  const [createRuleName, setCreateRuleName] = useState("");
  const [evaluateRuleName, setEvaluateRuleName] = useState("");
  const [data, setData] = useState("");
  const [result, setResult] = useState(null);
  const [combineRuleName, setCombineRuleName] = useState("");
  const [existingRuleName, setExistingRuleName] = useState("");
  const [newRuleString, setNewRuleString] = useState("");

  const createRule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/create-rule",
        { name: createRuleName, ruleString }
      );
      console.log("Rule created:", response.data);
      setCreateRuleName("");
      setRuleString("");
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  const evaluateRule = async () => {
    console.log(JSON.parse(data));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/evaluate-rule",
        { ruleName: evaluateRuleName, data: JSON.parse(data) } // Use ruleName to evaluate
      );
      setResult(response.data.result);
      setEvaluateRuleName("");
      setData("");
    } catch (error) {
      console.error("Error evaluating rule:", error);
    }
  };

  const combineRules = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/combine-rules",
        {
          oldRuleName: existingRuleName, // Assuming existingRuleName is an ID or name used to find the rule
          newRuleString,
          newName: combineRuleName,
        }
      );
      console.log("Combined rule:", response.data);
      setCombineRuleName("");
      setNewRuleString("");
      setExistingRuleName("");
    } catch (error) {
      console.error("Error combining rules:", error);
    }
  };

  return (
    <div className="App">
      <h1>Rule Engine</h1>
      <div>
        <h2>Create Rule</h2>
        <input
          type="text"
          placeholder="Rule Name"
          value={createRuleName}
          onChange={(e) => setCreateRuleName(e.target.value)}
        />
        <textarea
          placeholder="Enter rule string"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
        />
        <button onClick={createRule}>Create Rule</button>
      </div>
      <div>
        <h2>Evaluate Rule</h2>
        <input
          type="text"
          placeholder="Rule Name"
          value={evaluateRuleName}
          onChange={(e) => setEvaluateRuleName(e.target.value)}
        />
        <textarea
          placeholder="Enter JSON data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button onClick={evaluateRule}>Evaluate Rule</button>
        {result !== null && <p>Result: {result ? "True" : "False"}</p>}
      </div>
      <div>
        <h2>Combine Rules</h2>
        <input
          type="text"
          placeholder="New Rule Name"
          value={combineRuleName}
          onChange={(e) => setCombineRuleName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Existing Rule Name"
          value={existingRuleName}
          onChange={(e) => setExistingRuleName(e.target.value)}
        />
        <textarea
          placeholder="New Rule String"
          value={newRuleString}
          onChange={(e) => setNewRuleString(e.target.value)}
        />
        <button onClick={combineRules}>Combine Rules</button>
      </div>
    </div>
  );
}

export default App;
