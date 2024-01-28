import React from "react";
import {useNavigate} from "react-router-dom";
import {finalize, from} from "rxjs";
import axios from "axios";
import {environment} from "environments";
import * as confirm from "../../../../common/utils/confirm";
import {saveExportedFile} from "utils";
import "./ScenarioActions.scss";
import {Loader} from "components";
import {FileType} from "enums";

interface IProps {
    id: number;
    name: string;
    cardLoading: boolean;
    updateScenarios: () => void;
    setPageLoading: (loading: boolean) => void;
    setCardLoading: (loading: boolean) => void;
}

const ScenarioActions = ({id, name, setCardLoading, cardLoading, updateScenarios, setPageLoading}: IProps) => {
    const navigate = useNavigate();

    const onDelete = () => {
        confirm.remove(() => {
            setPageLoading(true);

            from(axios.delete(`${environment.baseApiUrl}delete-scenario/${id}`))
                .subscribe(() => updateScenarios());
        })
    }

    const onExport = () => {
        setCardLoading(true);

        from(axios.get(`${environment.baseApiUrl}export-scenario/${id}`))
            .pipe(finalize(() => setCardLoading(false)))
            .subscribe((response) => saveExportedFile(name, FileType.CSV, response.data));
    };

    const onEdit = () => navigate(`/edit-scenario/${id}`);

    if (cardLoading) return (<Loader/>)

    return (
        <>
            <button onClick={onEdit} className="edit-btn">Edit</button>
            <button onClick={onDelete} className="delete-btn">Delete</button>
            <button onClick={onExport} className="export-btn">Export</button>
            <button className="more-info-btn">More info</button>
        </>
    );
};

export default ScenarioActions;