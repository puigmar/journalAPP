import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note,
  },
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    if (!note.url) delete note.url;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const saveNote = await db
      .doc(`${uid}/journal/notes/${note.id}`)
      .update(noteToFirestore);

    dispatch(refreshNote(note.id, note));
    Swal.fire("Saved", note.title, "success");
  };
};

export const uploadPicture = (file) => ({
  type: types.notesFileUrl,
  payload: file,
});

export const startUploadPicture = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    const uid = getState().auth.uid;

    Swal.fire({
      title: "Uploading...",
      text: "Pelase wait...",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);

    Swal.close();

    activeNote.image_url = fileUrl;
    dispatch(startSaveNote(activeNote));
  };
};

export const deleteNote = (id) => ({
  type: types.noteDelete,
  payload: id,
});

export const startDeleteNote = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch(deleteNote(id));
  };
};

export const resetNotes = () => ({
  type: types.notesLogoutCleaning,
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});
