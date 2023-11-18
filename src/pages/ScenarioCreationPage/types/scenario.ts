import {IScenarioItem} from "./scenario-item.type";

export interface IScenario {
    id: number;
    systemName: string;
    name: string;
    description: string;
    status: string;
    createdByUserId: string;
    createdOn: Date;
    scenarioItems: IScenarioItem[];
}