import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentView from "./features/students/StudentView";
import StudentForm from "./features/students/StudentForm";
import StudentDetails from "./features/students/StudentDetails";
import ClassView from "./features/class/ClassView";
import SchoolView from "./features/school/SchoolView";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentView />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/classView" element={<ClassView />} />
        <Route path="/school" element={<SchoolView />} />
        <Route path="/addStudent" element={<StudentForm />} />
      </Routes>
    </Router>
  );
}
