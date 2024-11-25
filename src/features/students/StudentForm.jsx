import { useState } from "react";
import Header from "../../components/Header";
import { addStudentAsync, updateStudentAsync } from "./studentsSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const StudentForm = () => {
  const location = useLocation();
  // console.log(location);
  const studentToEdit = location.state?.student || null;

  // console.log(studentToEdit?._id);

  const [name, setName] = useState(studentToEdit?.name || "");
  const [age, setAge] = useState(studentToEdit?.age || "");
  const [grade, setGrade] = useState(studentToEdit?.grade || "");
  const [gender, setGender] = useState(studentToEdit?.gender || "");

  const [attendance, setAttendance] = useState(studentToEdit?.attendance || "");
  const [marks, setMarks] = useState(studentToEdit?.marks || "");

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !age || !grade || !gender) {
      setError("All fields are required");
    } else {
      const studentData = {
        name: name,
        age: age,
        grade: grade,
        gender: gender,
      };
      //adds attendance and marks fields when the exisiting student comes
      if (studentToEdit) {
        studentData.attendance = attendance;
        studentData.marks = marks;
      }

      if (studentToEdit) {
        //dispatch updateStudent asyncthunk

        dispatch(
          updateStudentAsync({ id: studentToEdit._id, data: studentData })
        )
          .then(() => {
            setSuccessMessage("Student updated successfully.");
          })
          .catch((error) => {
            console.log("Error updating a student", error);
          });
      } else {
        dispatch(addStudentAsync(studentData))
          .then(() => {
            setSuccessMessage("Student added successfully.");
          })
          .catch((error) => {
            console.log("Error adding a student", error);
          });
        // setName("")
        // setAge("")
        // setGrade("")
        // setGender("")
      }
      //dispatch data to addStudent async thunk
    }
  };

  return (
    <div>
      <Header />
      <div className="p-3 mb-3">
        <h3>{studentToEdit ? "Edit Student" : "Add Student"} </h3>
        {error && <p>{error} </p>}
        {successMessage && <p>{successMessage} </p>}
        <form className="mt-4" onSubmit={handleSubmit}>
          <label>Name: </label>{" "}
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />{" "}
          <br />
          <br />
          <label>Age: </label>{" "}
          <input
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />{" "}
          <br />
          <br />
          <label>Grade: </label>{" "}
          <input
            type="text"
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
          />{" "}
          <br />
          <br />
          <label>Gender: </label>{" "}
          <input
            type="radio"
            value="Male"
            name="gender"
            checked={gender === "Male"}
            onChange={(event) => setGender(event.target.value)}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(event) => setGender(event.target.value)}
          />
          Female
          <br />
          <br />
          {studentToEdit && (
            <>
              <label>Attendance: </label>{" "}
              <input
                type="text"
                value={attendance}
                onChange={(event) => setAttendance(event.target.value)}
              />{" "}
              <br />
              <br />
              <label>Marks: </label>{" "}
              <input
                type="text"
                value={marks}
                onChange={(event) => setMarks(event.target.value)}
              />{" "}
              <br />
              <br />
            </>
          )}
          <button type="submit">{studentToEdit ? "Update" : "Add"} </button>
        </form>
      </div>
    </div>
  );
};
export default StudentForm;
