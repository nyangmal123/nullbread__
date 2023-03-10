import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AXIOS_ADDRESS from './constant';

export const __getComment = createAsyncThunk(
  'comments/getcomment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${AXIOS_ADDRESS}/comments`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addComment = createAsyncThunk(
  'comments/addcomment',
  async (payload, thunkAPI) => {
    try {
      await axios.post(`${AXIOS_ADDRESS}/comments`, payload);
      const data = await axios.get(`${AXIOS_ADDRESS}/comments`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  'comments/deletecomment',
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`${AXIOS_ADDRESS}/comments/${payload}`);
      const data = await axios.get(`${AXIOS_ADDRESS}/comments`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteAllComment = createAsyncThunk(
  'comments/deletecomment',
  async (payload, thunkAPI) => {
    try {
      let data = await axios.get(`${AXIOS_ADDRESS}/comments`);
      for (let comment of data.data) {
        if (comment.post_id === payload) {
          await axios.delete(`${AXIOS_ADDRESS}/comments/${comment.id}`);
        }
      }

      data = await axios.get(`${AXIOS_ADDRESS}/comments`);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateComment = createAsyncThunk(
  'comments/updatecomment',
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`${AXIOS_ADDRESS}/comments/${payload.id}`, payload);
      const data = await axios.get(`${AXIOS_ADDRESS}/comments`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const __getcomments = createAsyncThunk(
//   "comments/getcomments",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.get("http://localhost:3003/comments");
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const initialState = {
  comments: [
    // {
    //   id: 1,
    //   title: "??????1",
    //   content: "??????1",
    //   isDone: false,
    //   displaytoggle: true,
    // },
    // {
    //   id: 2,
    //   title: "??????2",
    //   content: "??????2",
    //   isDone: false,
    //   displaytoggle: true,
    // },
  ],
  isLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments = [...state.comments, action.payload];
    },

    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comments) => comments.id !== action.payload
      );
    },

    toggleComment: (state, action) => {
      let commentlist = state.comments.slice();
      commentlist.find((e) => e.id === action.payload).isDone =
        !commentlist.find((e) => e.id === action.payload).isDone;
      state.comments = commentlist;
    },
    toggleDisplay: (state, action) => {
      let commentlist = state.comments.slice();
      commentlist.find((e) => e.id === action.payload).displaytoggle =
        !commentlist.find((e) => e.id === action.payload).displaytoggle;
      state.comments = commentlist;
    },
    updateComment: (state, action) => {
      let commentlist = state.comments.slice();
      // commentlist.find((e) => e.id === action.payload.id) =
      //   action.payload;
      // state.comments = commentlist;
    },
  },
  extraReducers: {
    [__getComment.pending]: (state) => {
      state.isLoading = true; // ???????????? ????????? ???????????? ??????????????? true??? ???????????????.
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false; // ???????????? ????????? ????????????, false??? ???????????????.
      state.comments = action.payload; // Store??? ?????? comments??? ???????????? ????????? comments??? ????????????.
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false; // ????????? ???????????????, ???????????? ????????? ????????????, false??? ???????????????.
      state.error = action.payload; // catch ??? error ????????? state.error??? ????????????.
    },

    [__addComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__updateComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__updateComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteAllComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteAllComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__deleteAllComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addComment,
  deleteComment,
  toggleComment,
  updateComment,
  toggleDisplay,
} = commentsSlice.actions;
// reducer ??? configStore??? ???????????? ?????? export default ?????????.
export default commentsSlice.reducer;
