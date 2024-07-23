import React, { useState } from "react";
import axios from "./axiosConfig"; // Import the configured axios instance
import { useNavigate, useParams } from "react-router-dom";

const CreateObjectiveQuestion = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Disable buttons while submitting
  const navigate = useNavigate();
  const { examId } = useParams();

  // Function to submit the current question
  const handleSubmitQuestion = async () => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);

    try {
      const authToken = localStorage.getItem("authToken");

      const response = await axios.post(
        `create-question/${examId}/`,
        {
          question,
          option1: options[0],
          option2: options[1],
          option3: options[2],
          answer,
        },
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
        "Error creating objective question:",
        error.response?.data || error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear form fields
  const clearForm = () => {
    setQuestion("");
    setOptions(["", "", ""]);
    setAnswer("");
  };

  // Handle option change in the form
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Navigate to the theory question creation page
  const handleNavigateToTheoryQuestions = () => {
    navigate(`/create-theory-question/${examId}`);
  };

  return (
    <div>
      <h2>Create Objective Question</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question"
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          placeholder={`Option ${index + 1}`}
        />
      ))}
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Correct Answer"
      />
      <button onClick={handleSubmitQuestion} disabled={isSubmitting}>
        Submit Question
      </button>
      <button onClick={handleNavigateToTheoryQuestions} disabled={isSubmitting}>
        Move to Theory Questions
      </button>
    </div>
  );
};

export default CreateObjectiveQuestion;
