import {IScenarioStep} from "./scenario-step.type";

export interface IScenario {
    systemName: string;
    name: string;
    description: string;
    status: string;
    steps: IScenarioStep[];
}