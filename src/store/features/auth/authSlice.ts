import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthState } from '../../../types'

const initialState: AuthState = {
  firstName: null,
  lastName: null,
  type: null,
  id: null,
  loading: false
}

export const login = createAsyncThunk(
  'login',
  async () => {
    // const result = await airtable
    //   .table('Classes')
    //   .select({
    //     filterByFormula: `FIND(", ${user},",", " & ARRAYJOIN(Students) & ",")`,
    //   })
    //   .all()
    // console.log({ result })
    // return {
    //   classes: result.map((r) => ({
    //     id: r.id,
    //     name: r.fields.Name as string,
    //     students: r.fields.Students as string[],
    //   })),
    //   user,
    // }
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        // state.classes = action.payload.classes
        // state.user = action.payload.user
        // state.loading = false
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
