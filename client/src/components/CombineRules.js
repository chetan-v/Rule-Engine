import React, { useState } from "react";
import axios from "axios";

function CombineRules() {
  const [rules, setRules] = useState([]);
  const [operator, setOperator] = useState("AND");
  const [combinedAst, setCombinedAst] = useState(null);

  const handleCombineRules = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/rules/combine", {
        ruleASTs: rules,
        operator,
      });
      setCombinedAst(response.data);
    } catch (error) {
      console.error("Error combining rules:", error);
    }
  };

  return (
    <div>
      <h2>Combine Rules</h2>
      <form onSubmit={handleCombineRules}>
        <textarea
          value={rules.join("\n")}
          onChange={(e) => setRules(e.target.value.split("\n"))}
          placeholder="Enter rules (one per line)"
        />
        <select value={operator} onChange={(e) => setOperator(e.target.value)}>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
        <button type="submit">Combine Rules</button>
      </form>
      {combinedAst && <pre>{JSON.stringify(combinedAst, null, 2)}</pre>}
    </div>
  );
}

export default CombineRules;
