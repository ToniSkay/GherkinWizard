import {DeleteOutlined} from "@ant-design/icons";
import "./StepDeleteButton.scss";
import {nanoid} from "nanoid";

interface IProps {
    removeStep: (index: number | number[]) => void;
    index: number;
}

export const StepDeleteButton = ({removeStep, index}: IProps) => {
    return (
        <button type="button" onClick={() => removeStep(index)} className="Btn scenario-delete-button">

            <div className="sign">
                <DeleteOutlined rev={nanoid()}/>
            </div>

            <div className="text">Delete</div>
        </button>
    )
}