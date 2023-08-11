'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Book = {
  id: number | null;
  name: string;
  category: string;
  description: string;
  launchDate: string;
  authors: [{ id: number | null; name: string }];
};

interface BookState {
  edit: boolean;
  book: Book;
}

const initialState: BookState = {
  edit: false,
  book: {
    id: null,
    name: '',
    category: '',
    description: '',
    launchDate: '',
    authors: [{ id: null, name: '' }],
  },
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    editBooks: (state, action: PayloadAction<BookState>) => {
      state.edit = action.payload.edit;
      state.book = action.payload.book;
    },
    resetBooks: (state) => {
      state.edit = false;
      state.book = { ...initialState.book };
    },
  },
});

export const { editBooks, resetBooks } = bookSlice.actions;

export default bookSlice.reducer;
