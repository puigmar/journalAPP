import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startlogout } from "../../actions/auth.actions";
import { startNewNote } from "../../actions/notes.actions";
import { JournalEntries } from "./JournalEntries";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(startlogout());
  };

  const handleAddEntry = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className='journal__sidebar'>
      <div className='journal__sidebar-navbar'>
        <h3 className='journal__sidebar-navbar__title'>
          <i className='far fa-moon'></i>
          <span>{name}</span>
        </h3>
        <button type='button' className='btn' onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className='journal__new-entry' onClick={handleAddEntry}>
        <i className='far fa-calendar-plus fa-5x'></i>
        <span>New entry</span>
      </div>

      <JournalEntries />
    </aside>
  );
};
