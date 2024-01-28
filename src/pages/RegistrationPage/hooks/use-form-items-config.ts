import {FormErrorMessage} from "enums";
import {FormItemProps} from "antd";
import {useMemo} from "react";
import {v4 as uuidv4} from "uuid";

export const useFormItemConfigs = () => {
    return useMemo<FormItemProps[]>(() => {
        return [
            {
                name: 'id',
                initialValue: uuidv4(),
                rules: [{required: true, message: FormErrorMessage.Required}]
            },
            {
                name: 'name',
                initialValue: '',
                rules: [{required: true, message: FormErrorMessage.Required}]
            },
            {
                name: 'password',
                initialValue: '',
                rules: [{required: true, message: FormErrorMessage.Required}]
            },
            {
                name: 'email',
                initialValue: '',
                rules: [
                    {required: true, message: FormErrorMessage.Required},
                    {type: 'email', message: FormErrorMessage.InvalidEmail}
                ]
            },
        ];
    }, []);
};