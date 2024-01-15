import {Form, Input, Modal, Radio} from "antd";
import TextArea from "antd/es/input/TextArea";
import {ScenarioStatus} from "../../../../common/enums/scenario-status.enum";
import "./ScenarioModal.scss";
import {ScenarioStep} from "./components/ScenarioStep/ScenarioStep";
import {useFormItemConfigs} from "./hooks/use-form-items-config";
import {customAlphabet, nanoid} from "nanoid";
import {IScenarioStep} from "../../types/scenario-step.type";
import {useScenarioCreationStore} from "../../store/scenario-creation-store";
import {IScenarioItem} from "../../types/scenario-item.type";

const SCENARIO_FORM_ID = 'scenario-form-id';

export const ScenarioModal = () => {
    const modalWidth = '90rem';
    const nanoidNumber = customAlphabet('1234567890', 18);

    const {setScenarioItems, isModalOpen, setIsModalOpen} = useScenarioCreationStore((state) => state);

    const { scenarioInfoConfig} = useFormItemConfigs({} as IScenarioItem);
    const [stepsForm] = Form.useForm();
    const [form] = Form.useForm();

    const [name, description, status] = scenarioInfoConfig;

    const handleCancel = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const onFinish = (values: any) => {
        const steps = stepsForm.getFieldsValue().steps.map((step: IScenarioStep) => ({...step, systemName: nanoid()}));
        setScenarioItems({...values, systemName: nanoidNumber(), steps});

        setIsModalOpen(false);
        resetForm();
    }

    const resetForm = () => {
        form.resetFields();
        resetSteps();
    }

    const resetSteps = () => {
        const values = stepsForm.getFieldValue('steps');
        stepsForm.setFieldsValue({ steps: values.slice(0, 0) });
    };

    return (
        <Modal
            className='scenario-modal'
            okButtonProps={{ form: SCENARIO_FORM_ID, htmlType: 'submit' }}
            width={modalWidth}
            destroyOnClose
            centered
            title="Scenario Creation"
            open={isModalOpen}
            onCancel={handleCancel}
        >
            <Form id={SCENARIO_FORM_ID} className="scenario-modal-form" name="scenario-form" form={form} onFinish={onFinish}>
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

                <h2>Steps</h2>
            </Form>

            <ScenarioStep form={stepsForm}></ScenarioStep>
        </Modal>
    )
}