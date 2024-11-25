import { createSlice } from "@reduxjs/toolkit";

const schoolsSlice = createSlice({
  name: "SCHOOL",
  initialState: {
    totalStudents: 0,
    averageAttendance: "0.00",
    averageMarks: "0.00",
    topStudent: "-",
  },
  reducers: {
    updateSchoolStats: (state, action) => {
      const { totalStudents, averageAttendance, averageMarks, topStudent } =
        action.payload;
      state.totalStudents = totalStudents;
      state.averageAttendance = averageAttendance;
      state.averageMarks = averageMarks;
      state.topStudent = topStudent;
    },
  },
});

//export the action created inside reducers
export const { updateSchoolStats } = schoolsSlice.actions;

//export the default reducer of schoolSlice
export default schoolsSlice.reducer;
