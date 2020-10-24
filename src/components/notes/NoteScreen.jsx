import React from "react";
import { NotesAppbar } from "./NotesAppbar";

export const NoteScreen = () => {
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
          />
          <textarea
            placeholder='What happened today?'
            className='notes__textarea'></textarea>
          <div className='notes__image'>
            <img
              src='https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?cs=srgb&dl=pexels-tobi-620337.jpg&fm=jpg'
              alt='imagen'
            />
          </div>
        </form>
      </div>
    </div>
  );
};
