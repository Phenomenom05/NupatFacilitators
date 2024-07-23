import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/create-exam">Create Exam</Link>
        </li>
        <li>
          <Link to="/create-question/:examId">Create Question</Link>
        </li>
        <li>
          <Link to="/create-theory/:examId">Create Theory Question</Link>
        </li>
        <li>
          <Link to="/submit-exam/:examId">Submit Exam</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
