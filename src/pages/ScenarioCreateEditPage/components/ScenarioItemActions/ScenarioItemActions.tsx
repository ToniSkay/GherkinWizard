import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {nanoid} from "nanoid";
import * as confirm from "../../../../common/utils/confirm";
import {useScenarioCreationStore} from "../../store/scenario-creation-store";
import "./ScenarioItemActions.scss";

interface IProps {
    id: number;
    systemName: string;
}

const ScenarioItemActions = ({id, systemName}: IProps) => {
    const {removeScenarioItem, openScenarioItemModal} = useScenarioCreationStore((state) => state);

    const onDelete = () => confirm.remove(() => removeScenarioItem(id))
    const onEdit = () => {openScenarioItemModal(true, systemName)}

    return (
        <div className="scenario-item-actions">
            <button onClick={onEdit} className="scenario-item-button edit">
                <EditFilled rev={nanoid()}/>
            </button>

            <button onClick={onDelete} className="scenario-item-button delete">
                <DeleteFilled rev={nanoid()}/>
            </button>
        </div>
    );
};

export default ScenarioItemActions;