import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAuth from "./UserAuth";
import CreateExam from "./CreateExam";
import "./styles.css";
import CreateObjectiveQuestion from "./CreateObjectiveQuestion";
import CreateTheoryQuestion from "./CreateTheoryQuestion";
import SubmitExams from "./SubmitExams";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserAuth />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route
          path="/create-objective-question/:examId"
          element={<CreateObjectiveQuestion />}
        />
        <Route
          path="/create-theory-question/:examId"
          element={<CreateTheoryQuestion />}
        />
        <Route path="/submit-exam/:examId" element={<SubmitExams />} />
      </Routes>
    </Router>
  );
}

export default App;
