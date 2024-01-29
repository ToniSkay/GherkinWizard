import {Button, Card, Form, Input} from "antd";
import "./ScenarioCreateEditPage.scss";
import {ScenarioItem} from "./components/ScenarioItem/ScenarioItem";
import TextArea from "antd/es/input/TextArea";
import {useEffect, useLayoutEffect, useState} from "react";
import {ScenarioItemModal} from "./components/ScenarioItemModal/ScenarioItemModal";
import {useFormItemConfigs} from "./hooks/use-form-items-config";
import {nanoid} from "nanoid";
import {useUserStore} from "stores";
import {finalize, from} from "rxjs";
import axios from "axios";
import {useScenarioCreationStore} from "./store/scenario-creation-store";
import {useConfirmBeforeLeaving} from "hooks";
import {environment} from "environments";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {LoadingWrapper, StatusSwitcher} from "components";
import {Path} from "enums";

export const ScenarioCreateEditPage = () => {
    const { scenarioId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const isEdit = location.pathname.includes('edit-scenario');

    const [isCreateLoading, setCreateLoading] = useState(false);
    const [isScenarioGetLoading, setScenarioGetLoading] = useState(false);
    const [isFormChanged, setIsFormChanged] = useState(false);

    useConfirmBeforeLeaving(isFormChanged);

    const {resetScenario, openScenarioItemModal, setScenario, scenario, isModalOpen} = useScenarioCreationStore((state) => state);
    const user = useUserStore((state) => state);

    const [form] = Form.useForm();
    const [name, description, status] = useFormItemConfigs(scenario, isEdit);

    useEffect(() => reset, []);
    useEffect(() => reset(), [isEdit]);
    useLayoutEffect(() => (scenarioId && getScenario()), []);

    const getScenario = () => {
        setScenarioGetLoading(true);

        from(axios.get(`${environment.baseApiUrl}get-scenario/${scenarioId}`))
            .pipe(finalize(() => setScenarioGetLoading(false)))
            .subscribe(({data}) => setScenario(data))
    }

    const onSave = () => {
        form.validateFields().then(() => {
            const url = isEdit ? `update-scenario/${scenarioId}` : `create-scenario`;
            const request = isEdit ? axios.put : axios.post;
            setIsFormChanged(false);
            setCreateLoading(true);

            from(request(`${environment.baseApiUrl}${url}`, getRequestBody()))
                .pipe(finalize(() => setCreateLoading(false)))
                .subscribe(() => navigate(Path.MyScenarios));
        })
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

    const showModal = () => openScenarioItemModal(true);
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

                        <Button className="save-scenario-btn" loading={isCreateLoading} onClick={onSave} type="primary">Save</Button>
                    </div>

                    <Form className="scenario-common-form" form={form} onChange={handleFormChange}>
                        <Form.Item label="Name" {...name}>
                            <Input type="text" />
                        </Form.Item>

                        <Form.Item label="Description" {...description}>
                            <TextArea className="scenario-description" size="large"/>
                        </Form.Item>

                        <StatusSwitcher statusFromItem={status}/>
                    </Form>
                </Card>

                <Button onClick={showModal} className="add-scenario-button">Add scenario</Button>

                {scenario?.scenarioItems && (
                    scenario.scenarioItems.map((item) => (
                        <ScenarioItem key={nanoid()} item={item}/>
                    ))
                )}

                {isModalOpen && (
                    <ScenarioItemModal/>
                )}
            </div>
        </LoadingWrapper>
    )
}