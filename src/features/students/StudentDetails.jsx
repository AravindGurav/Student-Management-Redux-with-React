import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchStudents, deleteStudentAsync } from "./studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";

const StudentDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");
  const { students, status, error } = useSelector((state) => state.student);
  //   console.log(id);

  console.log(students);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  //to pass the student object as a prop to a different componenct => to update Student records
  const student = students.find((student) => student._id === id);
  console.log(status);

  if (status === "Loading") {
    return <p>Loading.. </p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const clickHandler = (id) => {
    dispatch(deleteStudentAsync(id))
      .then(() => {
        setSuccessMessage("Student Record deleted successfully.");
      })
      .catch((error) => {
        setSuccessMessage("Failed to delete Student Record.", error);
      });
  };

  return (
    <div>
      <Header />

      <div className="p-3">
        {successMessage && <h4>{successMessage} </h4>}
        <h2>Student Details </h2>
        <p>Name: {student.name} </p>
        <p>Age: {student.age}</p>
        <p>Grade: {student.grade}</p>
        <p>Gender: {student.gender}</p>
        <p>Attendence: {student.attendance}</p>
        <p>Marks: {student.marks}</p>
        <Link to="/addStudent" state={{ student }}>
          <button className="btn btn-warning">Edit Details</button>
        </Link>

        <button
          className="mx-3 btn btn-danger"
          onClick={() => clickHandler(student._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default StudentDetails;
