import React, { useEffect } from "react";
import Header from "../../components/Header";
import { fetchStudents, setFilter, setSortBy } from "../students/studentsSlice";
import { useDispatch, useSelector } from "react-redux";

const ClassView = () => {
  const dispatch = useDispatch();
  const { students, status, error, sortBy, filter } = useSelector(
    (state) => state.student
  );

  const filteredStudents = students.filter((student) => {
    if (filter === "all") return true;
    if (filter === "male") return student.gender === "Male";
    if (filter === "female") return student.gender === "Female";
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "marks") return a.marks - b.marks;
    if (sortBy === "attendance") return a.attendance - b.attendance;
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);
  return (
    <>
      <Header />
      <div className="p-3">
        <h2>Class View </h2>
        {error && <p> Error: {error} </p>}
        {status === "Loading" && <p> Loading... </p>}
        <div className="my-3">
          <label>Filter by Gender: </label>
          <select
            className="me-2"
            value={filter}
            onChange={(event) => dispatch(setFilter(event.target.value))}
          >
            <option value="all"> All </option>
            <option value="male"> Male </option>
            <option value="female"> Female </option>
          </select>
        </div>

        <div className="my-3">
          <label>Sort by: </label>
          <select
            className="me-2"
            value={sortBy}
            onChange={(event) => dispatch(setSortBy(event.target.value))}
          >
            <option value="name"> Name </option>
            <option value="marks"> Marks </option>
            <option value="attendance"> Attendance </option>
          </select>
        </div>
        <ul>
          {sortedStudents.map((student) => (
            <li>
              {student.name} - {student.gender} - Marks: {student.marks} -
              Attendance: {student.attendance}{" "}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default ClassView;
