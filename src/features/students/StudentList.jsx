import React from "react";
import { Link } from "react-router-dom";
export default function StudentList({ students }) {
  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <Link to={`/student/${student._id}`}>
              {student.name} (Age: {student.age}){" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
