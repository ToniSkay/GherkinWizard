import {IScenarioStep} from "./scenario-step.type";

export interface IScenarioItem {
    id: number;
    systemName: string;
    name: string;
    description: string;
    status: string;
    steps: IScenarioStep[];
}