import ReactDOM from 'react-dom/client';
import ModalConfirmation from '../components/Modal/ModalConfirmation';

export const showConfirmationModal = () =>
    new Promise((resolve) => {
        const div = document.createElement('div');
        document.body.appendChild(div);

        const handleConfirm = (response: unknown) => {
            document.body.removeChild(div);
            resolve(response);
        };

        const root = ReactDOM.createRoot(div);
        root.render(<ModalConfirmation onConfirm={handleConfirm} />);
    });
