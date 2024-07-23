import React from "react";
import axios from "./axiosConfig"; // Import the configured axios instance
import { useNavigate, useParams } from "react-router-dom";

const SubmitExams = () => {
  const navigate = useNavigate();
  const { examId } = useParams();

  const handleSubmitExam = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      const response = await axios.post(
        `submit-exam/${examId}/`, // Correct endpoint
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token here
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data); // Handle success
      navigate("/"); // Redirect to home or any other page after submission
    } catch (error) {
      console.error(
        "Error submitting exam:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h2>Submit Exam</h2>
      <button onClick={handleSubmitExam}>Submit Exam</button>
    </div>
  );
};

export default SubmitExams;
