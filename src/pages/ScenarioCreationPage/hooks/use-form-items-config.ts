import {useMemo} from "react";
import {FormItemProps} from "antd";
import {ScenarioStatus} from "../../../common/enums/scenario-status.enum";
import {FormErrorMessage} from "../../../common/enums/form-error-message";

export const useFormItemConfigs = () => {
    const scenarioFormConfig = useMemo<FormItemProps[]>(() => {
        return [
            {
                name: 'name',
                initialValue: '',
                rules: [{ required: true, message: FormErrorMessage.Required }]
            },
            {
                name: 'description',
                initialValue: '',
            },
            {
                name: 'status',
                initialValue: ScenarioStatus.InProgress,
            },
        ];
    }, []);

    return { scenarioFormConfig };
};