import React from "react";
import {useNavigate} from "react-router-dom";
import {from} from "rxjs";
import axios from "axios";
import {environment} from "../../../../environments";
import * as confirm from "../../../../common/utils/confirm";
import "./ScenarioActions.scss";

interface IProps {
    id: number;
    updateScenarios: () => void;
    setLoading: (loading: boolean) => void;
}

const ScenarioActions = ({id, updateScenarios, setLoading}: IProps) => {
    const navigate = useNavigate();

    const onDelete = () => {
        confirm.remove(() => {
            setLoading(true);

            from(axios.delete(`${environment.baseApiUrl}delete-scenario/${id}`))
                .subscribe(() => updateScenarios());
        })
    }

    const onEdit = () => {
        navigate(`/edit-scenario/${id}`);
    }

    return (
        <>
            <button onClick={() => onEdit()} className="edit-btn">Edit</button>
            <button onClick={() => onDelete()} className="delete-btn">Delete</button>
            <button className="more-info-btn">More info</button>
        </>
    );
};

export default ScenarioActions;