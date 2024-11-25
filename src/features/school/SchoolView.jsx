import React, { useEffect } from "react";
import { updateSchoolStats } from "./schoolsSlice";
import { UseSelector, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Header from "../../components/Header";

const SchoolView = () => {
  const students = useSelector((state) => state.student.students);
  // console.log("School View");
  // console.log(students);

  const dispatch = useDispatch();

  useEffect(() => {
    if (students.length > 0) {
      const totalStudents = students.length;
      const totalAttendance = students.reduce(
        (acc, curr) => acc + curr.attendance,
        0
      );
      const totalMarks = students.reduce((acc, curr) => acc + curr.marks, 0);
      const averageAttendance = (totalAttendance / students.length).toFixed(2);
      const averageMarks = (totalMarks / totalStudents).toFixed(2);
      const topStudent = students.reduce(
        (topStudent, student) =>
          student.marks > topStudent.marks ? student : topStudent,
        students[0]
      );

      //dispatch the calculated items
      dispatch(
        updateSchoolStats({
          totalStudents: totalStudents,
          averageAttendance: averageAttendance,
          averageMarks: averageMarks,
          topStudent: topStudent.name,
        })
      );
    }
  }, [students, dispatch]);

  const schoolData = useSelector((state) => state.school);

  console.log(schoolData);
  return (
    <>
      <Header />

      <div className="mx-2 mt-4">
        <h1>School View </h1>
        <p>Total Students: {schoolData.totalStudents} </p>
        <p>Average Attendance: {schoolData.averageAttendance} </p>
        <p>Average Marks: {schoolData.averageMarks} </p>
        <p>Top Student: {schoolData.topStudent} </p>
      </div>
    </>
  );
};

export default SchoolView;
