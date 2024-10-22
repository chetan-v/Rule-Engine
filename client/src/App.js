import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateRule from "./components/CreateRule";
import CombineRules from "./components/CombineRules";
import EvaluateRule from "./components/EvaluateRule";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/create-rule">Create Rule</Link>
              </li>
              <li>
                <Link to="/combine-rules">Combine Rules</Link>
              </li>
              <li>
                <Link to="/evaluate-rule">Evaluate Rule</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/create-rule" element={<CreateRule />} />
            <Route path="/combine-rules" element={<CombineRules />} />
            <Route path="/evaluate-rule" element={<EvaluateRule />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
