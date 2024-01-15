import {Button, Card, Form, Input, Radio} from "antd";
import {ScenarioStatus} from "../../common/enums/scenario-status.enum";
import "./ScenarioCreateEditPage.scss";
import {ScenarioItem} from "./components/ScenarioItem/ScenarioItem";
import TextArea from "antd/es/input/TextArea";
import {useEffect, useLayoutEffect, useState} from "react";
import {ScenarioModal} from "./components/ScenarioModal/ScenarioModal";
import {useFormItemConfigs} from "./hooks/use-form-items-config";
import {nanoid} from "nanoid";
import {useUserStore} from "../../common/stores/user-store";
import {finalize, from} from "rxjs";
import axios from "axios";
import {useScenarioCreationStore} from "./store/scenario-creation-store";
import useConfirmBeforeLeaving from "../../common/hooks/useBlocker";
import {environment} from "../../environments";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {LoadingWrapper} from "common";

export const ScenarioCreateEditPage = () => {
    const { scenarioId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const isEdit = location.pathname.includes('edit-scenario');

    const [isCreateLoading, setCreateLoading] = useState(false);
    const [isScenarioGetLoading, setScenarioGetLoading] = useState(false);
    const [isFormChanged, setIsFormChanged] = useState(false);

    useConfirmBeforeLeaving(isFormChanged);

    const {resetScenario, setIsModalOpen, setScenario, scenario, removeScenarioItem} = useScenarioCreationStore((state) => state);
    const user = useUserStore((state) => state);

    const [form] = Form.useForm();
    const [name, description, status] = useFormItemConfigs(scenario, isEdit);

    useEffect(() => reset, []);
    useLayoutEffect(() => (scenarioId && getScenario()), []);

    const getScenario = () => {
        setScenarioGetLoading(true);

        from(axios.get(`${environment.baseApiUrl}get-scenario/${scenarioId}`))
            .pipe(finalize(() => setScenarioGetLoading(false)))
            .subscribe(({data}) => setScenario(data))
    }

    const onSave = () => {
        const url = isEdit ? `update-scenario/${scenarioId}` : `create-scenario`;
        const request = isEdit ? axios.put : axios.post;
        setCreateLoading(true);

        from(request(`${environment.baseApiUrl}${url}`, getRequestBody()))
            .pipe(finalize(() => setCreateLoading(false)))
            .subscribe(() => navigate('/all-tasks'));
    }

    const getRequestBody = () => {
        const editScenarioBody = {...scenario, ...form.getFieldsValue()};
        const createScenarioBody = ({
            ...form.getFieldsValue(),
            scenarioItems: scenario.scenarioItems,
            systemName: nanoid(),
            createdByUserId: user.systemName,
            createdOn: new Date()
        })

        return isEdit ? editScenarioBody : createScenarioBody;
    }

    const showModal = () => setIsModalOpen(true);
    const handleFormChange = () => setIsFormChanged(true)

    const reset = () => {
        form.resetFields();
        resetScenario();
    }

    return (
        <LoadingWrapper isLoading={isScenarioGetLoading}>
            <div className="scenario-page animate__animated animate__fadeInDown">
                <Card className="scenario-common">
                    <div className="scenario-header">
                        <h2>Common information</h2>

                        <Button loading={isCreateLoading} onClick={onSave} type="primary">Save</Button>
                    </div>

                    <Form className="scenario-common-form" form={form} onChange={handleFormChange}>
                        <Form.Item label="Name" {...name}>
                            <Input type="text" />
                        </Form.Item>

                        <Form.Item label="Description" {...description}>
                            <TextArea className="scenario-description" size="large"/>
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

                    {scenario?.scenarioItems && (
                        scenario.scenarioItems.map((item) => (
                            <ScenarioItem key={nanoid()} item={item} removeScenarioItem={removeScenarioItem}></ScenarioItem>
                        ))
                    )}

                <ScenarioModal/>
            </div>
        </LoadingWrapper>
    )
}