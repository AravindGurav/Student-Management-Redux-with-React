import { createSlice } from "@reduxjs/toolkit";

const schoolSlice = createSlice({
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
export const { updateSchoolStats } = schoolSlice.actions;

//export the default reducer of schoolSlice
export default schoolSlice.reducer;
