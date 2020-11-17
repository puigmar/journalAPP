import React from "react";
import dayjs from "dayjs";

export const JournalEntry = ({ id, title, body, image_url, date, onClick }) => {
  const weekDay = dayjs(date).format("dddd");
  const day = dayjs(date).format("DD");
  return (
    <div className='journal__entry pointer' onClick={onClick}>
      {image_url && (
        <div
          className='journal__entry-picture'
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${image_url})`,
          }}></div>
      )}
      <div className='journal__entry-body'>
        <p className='journal__entry-title'>{title}</p>
        <p className='journal__entry-content'>{body}</p>
      </div>
      <div className='journal__entry-date-box'>
        <span>{weekDay}</span>
        <h4>{day}</h4>
      </div>
    </div>
  );
};
