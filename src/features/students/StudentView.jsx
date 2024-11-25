import React from "react";
import { useEffect } from "react";
import { fetchStudents } from "./studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import StudentList from "./StudentList";
import Header from "../../components/Header";

export default function StudentView() {
  const dispatch = useDispatch();
  // const studentsArray = useSelector((state) => state.student);
  const { students, status, error } = useSelector((state) => state.student);

  console.log(students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div>
      <Header />
      {status === "Loading" && <p>Loading... </p>}
      {error && <p>{error} </p>}
      <h1>Student View </h1>
      <Link to="/addStudent">Add Student </Link>

      <StudentList students={students} />
    </div>
  );
}
