import React from "react";
import "./Scenario.scss";
import {IScenario} from "../../../ScenarioCreationPage/types/scenario";
import {ScenarioStatus} from "../../../../common/enums/scenario-status.enum";

export const Scenario = ({ name, status, description, createdOn }: IScenario) => {
  return (
    <div className="animate__animated animate__fadeInLeft card">
      <div className="card-details">
        <h2 className="text-title">{name}</h2>

        <hr className={"separator"} />

        <div className="text-body">
          {status === ScenarioStatus.Done ? (
            <span className="indicator success">{ScenarioStatus.Done}</span>
          ) : (
            <span className="indicator in-progress">{ScenarioStatus.InProgress}</span>
          )}

          <span className="date">{"Date: " + new Date(createdOn).toLocaleDateString()}</span>

          <p className="description">{description}</p>
        </div>
      </div>

      <button className="edit-btn">Edit</button>
      <button className="delete-btn">Delete</button>
      <button className="more-info-btn">More info</button>
    </div>
  );
};
