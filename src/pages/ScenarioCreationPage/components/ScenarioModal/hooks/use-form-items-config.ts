import {useMemo} from "react";
import {FormItemProps} from "antd";
import {ScenarioStatus} from "../../../../../common/enums/scenario-status.enum";
import {FormErrorMessage} from "../../../../../common/enums/form-error-message";
import {IScenarioItem} from "../../../types/scenario-item.type";

export const useFormItemConfigs = ({name, status, description}: IScenarioItem) => {

    const scenarioInfoConfig = useMemo<FormItemProps[]>(() => {
        return [
            {
                name: 'name',
                initialValue: name || '',
                rules: [{ required: true, message: FormErrorMessage.Required }]
            },
            {
                name: 'description',
                initialValue: description || '',
            },
            {
                name: 'status',
                initialValue: status || ScenarioStatus.InProgress,
            },
        ];
    }, [description, name, status]);

    return { scenarioInfoConfig };
};