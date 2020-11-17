import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploadPicture } from "../../actions/notes.actions";

export const NotesAppbar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);
  const picture = useRef(null);

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

  return (
    <div className='notes__appbar'>
      <span>29 de agosto 2020</span>

      <input
        ref={picture}
        type='file'
        style={{ display: "none" }}
        id='fileSelector'
        name='file'
        onChange={handleUploadPicture}
      />
      <div>
        <button className='btn' onClick={handleSelectPicture}>
          Picture
        </button>
        <button className='btn' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
