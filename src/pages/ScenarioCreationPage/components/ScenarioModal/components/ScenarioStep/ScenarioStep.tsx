import {Form, Input, Select} from "antd";
import "./ScenarioStep.scss";
import {scenarioTypeOptions} from "./constants/scenario-type-options";
import {StepDeleteButton} from "./components/StepDeleteButton/StepDeleteButton";
import {ScenarioItemType} from "../../../../enums/scenario-item-type.enum";
import React from "react";
import {PlusCircleFilled} from "@ant-design/icons";
import {nanoid} from "nanoid";

interface IProps {
    form: any;
}

export const ScenarioStep = ({form}: IProps) => {
    return (
        <div className="scenario-blocks">
            <Form form={form}>
                <Form.List name="steps" initialValue={[]}>
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...resetField}, index) => (
                                <div key={key} className="scenario-item animate__animated animate__fadeInDown">
                                    <Form.Item
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

                            <PlusCircleFilled rev={nanoid()} onClick={() => add()} />
                        </>
                    )}
                </Form.List>
            </Form>
        </div>
    )
}