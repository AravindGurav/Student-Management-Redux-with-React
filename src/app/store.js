import { configureStore } from "@reduxjs/toolkit";
import studentsSlice from "../features/students/studentsSlice";
import schoolsSlice from "../features/school/schoolsSlice";
export default configureStore({
  reducer: {
    student: studentsSlice,
    school: schoolsSlice,
  },
});
