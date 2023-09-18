import React from "react";
import "./Scenario.scss";

interface IProps {
  title: string;
  status: boolean;
  description: string;
  date: Date;
}

export const Scenario = ({ title, status, description, date }: IProps) => {
  return (
    <div className="animate__animated animate__fadeInLeft card">
      <div className="card-details">
        <h2 className="text-title">{title}</h2>

        <hr className={"separator"} />

        <div className="text-body">
          {status ? (
            <span className="indicator success">Done</span>
          ) : (
            <span className="indicator in-progress">In progress</span>
          )}
          <span className="date">{"Date: " + date.toLocaleDateString()}</span>
          <p className="description">{description}</p>
        </div>
      </div>

      <button className="card-button">More info</button>
    </div>
  );
};
