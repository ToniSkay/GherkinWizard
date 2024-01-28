import {Form, Input, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import "./ScenarioItemModal.scss";
import {ScenarioStep} from "./components/ScenarioStep/ScenarioStep";
import {useFormItemConfigs} from "./hooks/use-form-items-config";
import {customAlphabet, nanoid} from "nanoid";
import {IScenarioStep} from "../../types/scenario-step.type";
import {useScenarioCreationStore} from "../../store/scenario-creation-store";
import {IScenarioItem} from "../../types/scenario-item.type";
import {StatusSwitcher} from "components";

const SCENARIO_FORM_ID = 'scenario-form-id';

export const ScenarioItemModal = () => {
    const modalWidth = '90rem';
    const nanoidNumber = customAlphabet('1234567890', 18);

    const { scenario, currentScenarioItemSystemName, setScenarioItems, isModalOpen, openScenarioItemModal, removeScenarioItem} = useScenarioCreationStore((state) => state);

    const isEdit = !!currentScenarioItemSystemName;
    const scenarioItem: IScenarioItem = scenario.scenarioItems?.find(({systemName}) => systemName === currentScenarioItemSystemName) || {} as IScenarioItem;

    const { scenarioInfoConfig} = useFormItemConfigs(scenarioItem);
    const [stepsForm] = Form.useForm();
    const [form] = Form.useForm();

    const [name, description, status] = scenarioInfoConfig;

    const modalTitle = isEdit ? 'Scenario Editing' : 'Scenario Creation';

    const handleCancel = () => {
        openScenarioItemModal(false);
    };

    const onFinish = (values: any) => {
        Promise.all([form.validateFields(), stepsForm.validateFields()]).then(() => {
            const steps = stepsForm.getFieldsValue().steps.map((step: IScenarioStep) => ({...step, systemName: nanoid()}));

            isEdit ? update(values, steps) : create(values, steps)

            openScenarioItemModal(false);
        })
    }

    const create = (values: any, steps: IScenarioStep[]) => {
        setScenarioItems({...values, systemName: nanoidNumber(), steps});
    }

    const update = (values: any, steps: IScenarioStep[]) => {
        removeScenarioItem(scenarioItem.id);
        setScenarioItems({...scenarioItem, ...values, steps});
    }

    return (
        <Modal
            className='scenario-modal'
            okButtonProps={{ form: SCENARIO_FORM_ID, htmlType: 'submit' }}
            width={modalWidth}
            destroyOnClose
            centered
            title={modalTitle}
            open={isModalOpen}
            onCancel={handleCancel}
        >
            <Form id={SCENARIO_FORM_ID} className="scenario-modal-form" name="scenario-form" form={form} onFinish={onFinish}>
                <Form.Item label="Name" {...name}>
                    <Input type="text" />
                </Form.Item>

                <Form.Item label="Description" {...description}>
                    <TextArea className="scenario-item-description" size="large"/>
                </Form.Item>

                <StatusSwitcher statusFromItem={status}/>

                <h2>Steps</h2>
            </Form>

            <ScenarioStep initialValue={isEdit ? scenarioItem.steps : []} form={stepsForm}></ScenarioStep>
        </Modal>
    )
}