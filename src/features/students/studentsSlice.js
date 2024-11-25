import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//asyncthunk for fetching students from db
export const fetchStudents = createAsyncThunk(
  "students/fetchStudentList",
  async () => {
    const response = await axios.get(
      "https://backend-student-management.vercel.app/students"
    );

    // console.log(response.data);
    return response;
  }
);

//async thunk to delete a student from the DB via delete method
export const deleteStudentAsync = createAsyncThunk(
  "students.deleteStudent",
  async (id) => {
    const response = await axios.delete(
      `https://backend-student-management.vercel.app/students/${id}`
    );
    return response.data;
  }
);
//async thunk to update the DB via put method
export const updateStudentAsync = createAsyncThunk(
  "students/updateStudent",
  async ({ id, data }) => {
    const response = await axios.put(
      `https://backend-student-management.vercel.app/students/${id}`,
      data
    );
    // console.log(response.data);
    return response.data;
  }
);

//async thunk to send data to db through api
export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    const response = await axios.post(
      "https://backend-student-management.vercel.app/students",
      newStudent
    );
    console.log(response.data);
    return response.data;
  }
);

export const studentsSlice = createSlice({
  name: "STUDENTS",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    filter: "all",
    sortBy: "name",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "Success";
      state.students = action.payload.data;
    });
    builder.addCase(fetchStudents.rejected, (state) => {
      state.status = "Error";
      state.error = action.error.message;
    });
    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      // console.log(state.students);
      state.students.push(action.payload);
    });
    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      state.status = "Success";
      const index = state.students.findIndex(
        (student) => student._id === action.payload._id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }

      // console.log("inside the extra reducers");
      // console.log("Updated students", state.students);
    });
    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.status = "Success";
    });
  },
});

export const { setFilter, setSortBy } = studentsSlice.actions;

export default studentsSlice.reducer;
