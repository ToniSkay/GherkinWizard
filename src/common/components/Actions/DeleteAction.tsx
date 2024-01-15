import './DeleteAction.scss';
import * as confirm from 'utils'

interface IProps {
    onConfirm: () => void
}

export const DeleteAction = ({onConfirm}: IProps) => {

    const onDelete = () => {
        confirm.remove(() => {
            onConfirm();
        })
    }

    return (
        <div>
            <button onClick={onDelete} className="delete-btn">Delete</button>
        </div>
    );
};

