import React from "react";
import { JournalEntries } from "./JournalEntries";

export const Sidebar = () => {
  return (
    <aside className='journal__sidebar'>
      <div className='journal__sidebar-navbar'>
        <h3 className='journal__sidebar-navbar__title'>
          <i className='far fa-moon'></i>
          <span>Ferran</span>
        </h3>
        <button type='button' className='btn'>
          Logout
        </button>
      </div>

      <div className='journal__new-entry'>
        <i className='far fa-calendar-plus fa-5x'></i>
        <span>New entry</span>
      </div>

      <JournalEntries />
    </aside>
  );
};
