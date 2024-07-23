import React, { useState } from "react";
import axios from "./axiosConfig"; // Import the axios instance
import { useNavigate } from "react-router-dom";

const CreateExam = () => {
  const [examName, setExamName] = useState("");
  const navigate = useNavigate();

  const handleCreateExam = async () => {
    try {
      const response = await axios.post(
        "create-exam/",
        { name: examName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data); // Handle success
      navigate(`/create-objective-question/${response.data.examId}`); // Redirect after creation
    } catch (error) {
      console.error(
        "Error creating exam:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h2>Create Exam</h2>
      <input
        type="text"
        value={examName}
        onChange={(e) => setExamName(e.target.value)}
        placeholder="Exam Name"
      />
      <button onClick={handleCreateExam}>Create Exam</button>
    </div>
  );
};

export default CreateExam;
