import {Button, Card, Form, Input, Radio} from "antd";
import {ScenarioStatus} from "../../common/enums/scenario-status.enum";
import "./ScenarioCreationPage.scss";
import {Scenario} from "./components/Scenario/Scenario";
import TextArea from "antd/es/input/TextArea";
import React, {FormEvent, useEffect, useState} from "react";
import {ScenarioModal} from "./components/ScenarioModal/ScenarioModal";
import {useFormItemConfigs} from "./hooks/use-form-items-config";
import {nanoid} from "nanoid";
import {useUserStore} from "../../common/stores/user-store";
import {finalize, from} from "rxjs";
import axios from "axios";
import {useScenarioCreationStore} from "./store/scenario-creation-store";
import useConfirmBeforeLeaving from "../../common/hooks/useBlocker";

export const ScenarioCreationPage = () => {
    const [isLoading, setLoading] = useState(false);
    const [isFormChanged, setIsFormChanged] = useState(false);
    useConfirmBeforeLeaving(isFormChanged);

    const {resetScenarioItems, setIsModalOpen, scenarioItems} = useScenarioCreationStore((state) => state);
    const user = useUserStore((state) => state);

    const [form] = Form.useForm();
    const {scenarioFormConfig} = useFormItemConfigs();
    const [name, description, status] = scenarioFormConfig;

    useEffect(() => {
        reset();
    }, []);

    const onSave = () => {
        setLoading(true);

        from(axios.post("https://localhost:7167/create-scenario", getRequestBody()))
            .pipe(finalize(() => setLoading(false)))
            .subscribe(() => reset());
    }

    const getRequestBody = () => {
        return ({
            ...form.getFieldsValue(),
            scenarioItems: scenarioItems,
            systemName: nanoid(),
            createdByUserId: user.systemName,
            createdOn: new Date()
        })
    }

    const showModal = () => setIsModalOpen(true);

    const handleFormChange = (event: FormEvent) => {
        // const data = new FormData(event.currentTarget as HTMLFormElement);
        // const values = Array.from(data.values());
        // console.log(values)
        // const changedValues = values.filter((value: string) => {
        //     console.log(value)
        //     return !!value;
        // });

        // console.log(!!changedValues.length)
        setIsFormChanged(true);
    }

    const reset = () => {
        form.resetFields();
        resetScenarioItems();
    }

    return (
        <div className="scenario-page animate__animated animate__fadeInDown">
            <Card className="scenario-common">
                <div className="scenario-header">
                    <h2>Common information</h2>

                    <Button loading={isLoading} onClick={onSave} type="primary">Save</Button>
                </div>

                <Form className="scenario-common-form" form={form} onChange={handleFormChange}>
                    <Form.Item label="Name" {...name}>
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item label="Description" {...description}>
                        <TextArea size="large"/>
                    </Form.Item>

                    <Form.Item label="Status" {...status}>
                        <Radio.Group
                            buttonStyle="solid"
                        >
                            <Radio.Button className="in-progress-status" value={ScenarioStatus.InProgress}>
                                {ScenarioStatus.InProgress}
                            </Radio.Button>
                            <Radio.Button className="done-status" value={ScenarioStatus.Done}>
                                {ScenarioStatus.Done}
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Card>

            <Button onClick={showModal} className="add-scenario-button">Add scenario</Button>

            {scenarioItems.map((item, index) => (
                <Scenario key={index} name={item.name} description={item.description}></Scenario>
            ))}

            <ScenarioModal/>
        </div>
    )
}