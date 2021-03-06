/*

  {
    notes: [],
    active: null,
    active: {
      id: "dadasdasdasd",
      title: "",
      body: "",
      imageUrl: "",
      date: 2131231231232
    }
  }

*/

import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: { ...action.payload },
      };

    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };

    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };

    case types.notesFileUrl:
      return {
        ...state,
        active: {
          ...state.active,
          imageUrl: action.payload,
        },
      };

    case types.noteDelete:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
        active: null,
      };

    case types.notesLogoutCleaning:
      return {
        ...state,
        ...initialState,
      };

    case types.notesAddNew:
      const newNote = action.payload;
      return {
        ...state,
        notes: [newNote, ...state.notes],
      };

    default:
      return state;
  }
};
