import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startDeleteNote,
  startSaveNote,
  startUploadPicture,
} from "../../actions/notes.actions";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

export const NotesAppbar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);
  const picture = useRef(null);

  const date = dayjs(active.date).format("DD [de] MMMM YYYY");

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handleSelectPicture = () => {
    picture.current.click();
  };

  const handleUploadPicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploadPicture(file));
    }
  };

  const handleDelete = (id) => {
    dispatch(startDeleteNote(id));
  };

  return (
    <div className='notes__appbar'>
      <span>{date}</span>

      <input
        ref={picture}
        type='file'
        style={{ display: "none" }}
        id='fileSelector'
        name='file'
        onChange={handleUploadPicture}
      />
      <div className='notes__appbar__actions'>
        <button className='btn' onClick={handleSelectPicture}>
          Picture
        </button>
        <button className='btn' onClick={handleSave}>
          Save
        </button>
        <button className='btn' onClick={() => handleDelete(active.id)}>
          Delete Note
        </button>
      </div>
    </div>
  );
};
