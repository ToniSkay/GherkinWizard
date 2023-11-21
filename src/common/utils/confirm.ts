import {Modal, notification} from "antd";

const { confirm: confirmModal } = Modal;

const leave = (onOk: () => void) => {
    confirm('Are you sure you want to leave this page? You will lose your data.', '', onOk)
}

const remove = (onOk: () => void) => {
    confirm('Are you sure you want to delete this item?', 'Item has been deleted', onOk);
}

const confirm = (message: string, successMessage: string, onOk: () => void) => {
    confirmModal({
        title: 'Confirmation',
        icon: '',
        content: message,
        centered: true,
        async onOk() {
            try {
                await onOk();

                successMessage && notification.success({
                    message: 'Success',
                    description: successMessage,
                });
            } catch {
                notification.error({
                    message: 'Error',
                    description: 'Something went wrong',
                });
            }
        },
    });
}

export {remove, leave};