import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import searchService from "./SearchService";

export const search = createAsyncThunk(
  "joogle/search",
  async (searchTerm, thunkAPI) => {
    try {
      return await searchService.search(searchTerm);
    } catch (error) {
      const message =
        (error.response & error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
export const searchSlice = createSlice({
  name: "joogle",
  initialState: {
    results: {},
    message:"",
    isLoading: false,
    isSuccess: null,
    isError: null,
  },
  reducers: {
    reset: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message =""
        state.results = {};
      },


  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.results = action.payload;

      })
      .addCase(search.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message
       
      });
  },
});
export const { reset } = searchSlice.actions;
export default searchSlice.reducer;
