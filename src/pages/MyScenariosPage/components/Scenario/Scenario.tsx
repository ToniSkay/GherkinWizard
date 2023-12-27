import React from "react";
import "./Scenario.scss";
import {IScenario} from "../../../ScenarioCreationPage/types/scenario";
import {ScenarioStatus} from "../../../../common/enums/scenario-status.enum";
import {DeleteAction} from "common-components";
import {from} from "rxjs";
import axios from "axios";
import {environment} from "../../../../environments";
import {useNavigate} from "react-router-dom";

interface IProps extends IScenario {
    updateScenarios: () => void;
    setLoading: (loading: boolean) => void;
}

export const Scenario = ({ name, status, description, createdOn, updateScenarios, id, setLoading }: IProps) => {
    const navigate = useNavigate();

    const onDelete = () => {
        setLoading(true);

        from(axios.delete(`${environment.baseApiUrl}delete-scenario/${id}`))
            .subscribe(() => updateScenarios());
    }

    const onEdit = () => {
        navigate(`/edit-scenario/${id}`);
    }

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

          <button onClick={() => onEdit()} className="edit-btn">Edit</button>
          <DeleteAction onConfirm={onDelete}/>
          <button className="more-info-btn">More info</button>
      </div>
  );
};
