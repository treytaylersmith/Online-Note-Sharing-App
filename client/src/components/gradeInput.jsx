import React, { useState } from "react";

const GradeInput = () => {
  const [midterm1, setMidterm1] = useState(0);
  const [midterm2, setMidterm2] = useState(0);
  const [finalExam, setFinalExam] = useState(0);
  const [assignments, setAssignments] = useState([0]); // Array to store assignment grades

  // Calculate the total grade
  const calculateTotal = () => {
    const assignmentTotal = assignments.reduce(
      (acc, grade) => acc + parseFloat(grade || 0), 
      0
    );
    
    // Total sum of midterms, final exam, and assignments
    const totalSum = parseFloat(midterm1 || 0) + parseFloat(midterm2 || 0) + parseFloat(finalExam || 0) + assignmentTotal;

    // Total number of graded items (3 = 2 midterms + 1 final exam)
    const totalItems = 3 + assignments.length; // Use assignments.length instead of assignmentNum
    
    return totalSum / totalItems;  // Return the actual average
  };

  // Handle assignment grade changes
  const handleAssignmentChange = (index, value) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index] = value;
    setAssignments(updatedAssignments);
  };

  // Add a new assignment input
  const addAssignment = () => {
    setAssignments([...assignments, 0]);
  };

  // Remove an assignment input
  const removeAssignment = (index) => {
    const updatedAssignments = assignments.filter((_, i) => i !== index);
    setAssignments(updatedAssignments);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title mb-0">Course Grades Input</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Midterm 1:</label>
            <input
              type="number"
              className="form-control"
              value={midterm1}
              onChange={(e) => setMidterm1(parseFloat(e.target.value) || 0)}  
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Midterm 2:</label>
            <input
              type="number"
              className="form-control"
              value={midterm2}
              onChange={(e) => setMidterm2(parseFloat(e.target.value) || 0)}  
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Final Exam:</label>
            <input
              type="number"
              className="form-control"
              value={finalExam}
              onChange={(e) => setFinalExam(parseFloat(e.target.value) || 0)}  ></input>
          </div>

          <h3 className="mt-4">Assignments</h3>
          {assignments.map((grade, index) => (
            <div className="d-flex align-items-center mb-2" key={index}>
              <label className="form-label me-2">
                Assignment {index + 1}:
              </label>
              <input
                type="number"
                className="form-control w-50 me-2"
                value={grade}
                onChange={(e) => handleAssignmentChange(index, parseFloat(e.target.value) || 0)}  
              />
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeAssignment(index)}
              >
                - Remove
              </button>
            </div>
          ))}
          <button className="btn btn-success mb-4" onClick={addAssignment}>
            + Add Assignment
          </button>

          <hr />

          {/* Display the average grade */}
          <h3>Total Grade: {calculateTotal().toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default GradeInput;
