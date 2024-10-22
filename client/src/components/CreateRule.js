import React, { useState } from "react";
import axios from "axios";

function CreateRule() {
  const [ruleString, setRuleString] = useState("");
  const [ast, setAst] = useState(null);

  const handleCreateRule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rules/create",
        {
          ruleString,
          ast,
        }
      );
      setAst(response.data);
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  return (
    <div>
      <h2>Create Rule</h2>
      <form onSubmit={handleCreateRule}>
        <input
          type="text"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          placeholder="Enter rule string"
        />
        <button type="submit">Create Rule</button>
      </form>
      {ast && <pre>{JSON.stringify(ast, null, 2)}</pre>}
    </div>
  );
}

export default CreateRule;
