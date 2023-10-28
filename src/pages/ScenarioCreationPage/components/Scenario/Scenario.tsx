import {Card} from "antd";
import "./Scenario.scss";

interface IProps {
    name: string;
    description: string;
}

export const Scenario = ({name, description}: IProps) => {
    return (
        <Card className="scenario">
            <h2 className="scenario-name">{name}</h2>
            <p>{description}</p>
        </Card>
    )
}