import React from "react";
import "./ScenarioCard.scss";
import {IScenario} from "../../../ScenarioCreateEditPage/types/scenario";
import {ScenarioStatus} from "../../../../common/enums/scenario-status.enum";
import ScenarioActions from "../ScenarioActions/ScenarioActions";

interface IProps {
    item: IScenario;
    updateScenarios: () => void;
    setLoading: (loading: boolean) => void;
}

export const ScenarioCard = ({ updateScenarios, setLoading, item }: IProps) => {
    const {name, createdOn, description, status, id} = item;

    const isDone = status === ScenarioStatus.Done;
    const indicatorContent = isDone ? ScenarioStatus.Done : ScenarioStatus.InProgress;
    const indicatorClassName = isDone ? 'success' : 'in-progress';

  return (
      <div className="animate__animated animate__fadeInLeft card">
          <div className="card-details">
              <h2 className="card-title">{name}</h2>

              <hr className={"separator"} />

              <div className="card-body">
                  <span className={`indicator ${indicatorClassName}`}>{indicatorContent}</span>

                  <span className="scenario-date">{"Date: " + new Date(createdOn).toLocaleDateString()}</span>

                  <p className="scenario-description">{description}</p>
              </div>
          </div>

          <ScenarioActions id={id} updateScenarios={updateScenarios} setLoading={setLoading}/>
      </div>
  );
};
