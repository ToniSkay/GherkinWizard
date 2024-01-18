import {Form, Input, Select} from "antd";
import "./ScenarioStep.scss";
import {scenarioTypeOptions} from "./constants/scenario-type-options";
import {StepDeleteButton} from "./components/StepDeleteButton/StepDeleteButton";
import {ScenarioItemType} from "../../../../enums/scenario-item-type.enum";
import {PlusCircleFilled} from "@ant-design/icons";
import {nanoid} from "nanoid";
import {IScenarioStep} from "../../../../types/scenario-step.type";
import {FormErrorMessage} from "../../../../../../common/enums/form-error-message";

interface IProps {
    form: any;
    initialValue: IScenarioStep[];
}

export const ScenarioStep = ({form, initialValue}: IProps) => {
    return (
        <div className="scenario-blocks">
            <Form form={form}>
                <Form.List name="steps" initialValue={initialValue}>
                    {(fields, {add, remove}) => (
                        <div className="steps-list">
                            {fields.map(({key, name, ...resetField}, index) => (
                                <div key={key} className="scenario-item animate__animated animate__fadeInDown">
                                    <Form.Item
                                        rules={[{ required: true, message: FormErrorMessage.Required }]}
                                        {...resetField}
                                        name={[name, 'type']}
                                        initialValue={ScenarioItemType.Given}
                                        className="step-form-item"
                                    >
                                        <Select
                                            className="select-type"
                                            options={scenarioTypeOptions}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        {...resetField}
                                        rules={[{ required: true, message: FormErrorMessage.Required }]}
                                        name={[name, 'description']}
                                        initialValue=""
                                        className="input-description step-form-item"
                                    >
                                        <Input
                                            placeholder="Describe a point"
                                        ></Input>
                                    </Form.Item>

                                    <StepDeleteButton index={index} removeStep={remove}></StepDeleteButton>
                                </div>
                            ))}

                            <PlusCircleFilled className="plus-circle" rev={nanoid()} onClick={() => add()} />
                        </div>
                    )}
                </Form.List>
            </Form>
        </div>
    )
}