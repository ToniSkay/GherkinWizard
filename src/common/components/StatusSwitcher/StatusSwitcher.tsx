import {Form, FormItemProps, Radio} from "antd";
import {ScenarioStatus} from "enums";
import "./StatusSwitcher.scss";

interface IProps {
    statusFromItem:  FormItemProps;
}

export const StatusSwitcher = ({statusFromItem}: IProps) => {
    return (
        <Form.Item label="Status" {...statusFromItem}>
            <Radio.Group className="status-switcher" buttonStyle="solid">
                <Radio.Button className="in-progress-status" value={ScenarioStatus.InProgress}>
                    {ScenarioStatus.InProgress}
                </Radio.Button>
                <Radio.Button className="done-status" value={ScenarioStatus.Done}>
                    {ScenarioStatus.Done}
                </Radio.Button>
            </Radio.Group>
        </Form.Item>
    );
};
