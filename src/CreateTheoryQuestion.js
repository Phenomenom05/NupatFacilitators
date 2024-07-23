import React, { useState } from "react";
import axios from "./axiosConfig"; // Import the configured axios instance
import { useNavigate, useParams } from "react-router-dom";

const CreateTheoryQuestion = () => {
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Disable buttons while submitting
  const navigate = useNavigate();
  const { examId } = useParams();

  // Function to submit the current theory question
  const handleSubmitQuestion = async () => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);

    try {
      const authToken = localStorage.getItem("authToken");

      const response = await axios.post(
        `create-theoryquestion/${examId}/`,
        { question },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Include the token here
          },
        }
      );

      console.log(response.data); // Handle success
      clearForm(); // Clear form fields after submission
    } catch (error) {
      console.error(
        "Error creating theory question:",
        error.response?.data || error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear form fields
  const clearForm = () => {
    setQuestion("");
  };

  return (
    <div>
      <h2>Create Theory Question</h2>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question"
      />
      <button onClick={handleSubmitQuestion} disabled={isSubmitting}>
        Submit Theory Question
      </button>

      <button
        onClick={() => navigate(`/create-objective-question/${examId}`)}
        disabled={isSubmitting}
      >
        Back to Objective Questions
      </button>
      <button
        onClick={() => navigate(`/submit-exam/${examId}`)}
        disabled={isSubmitting}
      >
        Submit Exam
      </button>
    </div>
  );
};

export default CreateTheoryQuestion;
