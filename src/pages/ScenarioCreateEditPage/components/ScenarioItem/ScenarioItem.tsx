import {Card} from "antd";
import "./ScenarioItem.scss";
import {IScenarioItem} from "../../types/scenario-item.type";
import ScenarioItemActions from "../ScenarioItemActions/ScenarioItemActions";

interface IProps {
    item: IScenarioItem;
}

export const ScenarioItem = ({item}: IProps) => {
    const {name, description, id, systemName} = item;

    return (
        <Card className="scenario">
            <div className="scenario-item-header">
                <h2 className="scenario-name">{name}</h2>

                <ScenarioItemActions systemName={systemName} id={id}/>
            </div>

            <p>{description}</p>
        </Card>
    )
}