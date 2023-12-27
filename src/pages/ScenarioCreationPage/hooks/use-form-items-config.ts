import {ScenarioStatus} from "../../../common/enums/scenario-status.enum";
import {FormErrorMessage} from "../../../common/enums/form-error-message";
import {IScenario} from "../types/scenario";
import {useMemo} from "react";
import {FormItemProps} from "antd";

export const useFormItemConfigs = (scenario: IScenario, isEdit: boolean) => {
    return useMemo<FormItemProps[]>(() => {
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
    }, [scenario.id, isEdit]);
};