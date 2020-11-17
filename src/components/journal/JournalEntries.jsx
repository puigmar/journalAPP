import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote } from "../../actions/notes.actions";
import { JournalEntry } from "./JournalEntry";

export const JournalEntries = () => {
  const { notes } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleActiveNote = (note) => {
    console.log(note);
    dispatch(activeNote(note.id, note));
  };

  return (
    <div className='journal__entries'>
      {notes.map((note) => (
        <JournalEntry
          key={note.id}
          {...note}
          onClick={() => handleActiveNote(note)}
        />
      ))}
    </div>
  );
};
