import {Card} from "antd";
import "./Scenario.scss";
import {IScenarioItem} from "../../types/scenario-item.type";
import {nanoid} from "nanoid";
import {DeleteOutlined} from "@ant-design/icons";
import * as confirm from "../../../../common/utils/confirm";

interface IProps {
    item: IScenarioItem;
    removeScenarioItem: (id: number) => void;
}

export const Scenario = ({item, removeScenarioItem}: IProps) => {
    const {name, description, id} = item;

    const onDelete = () => confirm.remove(() => removeScenarioItem(id))

    return (
        <Card className="scenario">
            <div className="scenario-item-header">
                <h2 className="scenario-name">{name}</h2>

                <div className="scenario-actions">
                    <button onClick={onDelete} className="delete-scenario-item-button">
                        <DeleteOutlined rev={nanoid()}/>
                    </button>
                </div>
            </div>

            <p>{description}</p>
        </Card>
    )
}