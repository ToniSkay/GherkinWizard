import {ScenarioItemType} from "../../../../../enums/scenario-item-type.enum";

export const scenarioTypeOptions = [
    { value: ScenarioItemType.Given, label: ScenarioItemType.Given },
    { value: ScenarioItemType.When, label: ScenarioItemType.When },
    { value: ScenarioItemType.Then, label: ScenarioItemType.Then },
    { value: ScenarioItemType.And, label: ScenarioItemType.And },
    { value: ScenarioItemType.But, label: ScenarioItemType.But },
];