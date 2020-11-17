import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, updateNotes } from "../../actions/notes.actions";
import { useForm } from "../../hooks/useForm";
import { NotesAppbar } from "./NotesAppbar";

export const NoteScreen = () => {
  const { active: note, notes } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const dispatch = useDispatch();
  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    const newNote = {
      id: activeId,
      ...formValues,
    };
    dispatch(activeNote(formValues.id, newNote));
    //dispatch(updateNotes(newNote));
  }, [formValues]);

  const { body, title, url } = formValues;
  return (
    <div className='notes__main-content'>
      <NotesAppbar />

      <div className='notes__content'>
        <form>
          <input
            type='text'
            placeholer='Some awesome title'
            className='notes__title-input'
            autoComplete='false'
            value={title}
            name='title'
            onChange={handleInputChange}
          />
          <textarea
            placeholder='What happened today?'
            className='notes__textarea'
            name='body'
            onChange={handleInputChange}
            value={body}
          />
          {url && (
            <div className='notes__image'>
              <img name='url' src={`${url}`} alt='imagen' />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
