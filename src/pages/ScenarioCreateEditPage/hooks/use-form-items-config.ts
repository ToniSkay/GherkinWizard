import {FormErrorMessage, ScenarioStatus} from "enums";
import {IScenario} from "../types/scenario";
import {FormItemProps} from "antd";
import {useMemo} from "react";

export const useFormItemConfigs = (scenario: IScenario, isEdit: boolean) => {
    return useMemo<FormItemProps[]>(() => {
        if (scenario.systemName || !isEdit) {
            return [
                {
                    name: 'name',
                    initialValue: isEdit ? scenario.name : '',
                    rules: [{required: true, message: FormErrorMessage.Required}]
                },
                {
                    name: 'description',
                    initialValue: isEdit ? scenario.description : '',
                },
                {
                    name: 'status',
                    initialValue: isEdit ? scenario.status : ScenarioStatus.InProgress,
                },
            ];
        } else {
            return [];
        }
    }, [scenario.systemName, isEdit]);
};