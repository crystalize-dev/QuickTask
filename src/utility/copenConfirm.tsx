import ReactDOM from 'react-dom/client';
import ConfirmationModal from '../components/modalConfirmation';

export const showConfirmationModal = () =>
    new Promise((resolve) => {
        const div = document.createElement('div');
        document.body.appendChild(div);

        const handleConfirm = (response: unknown) => {
            document.body.removeChild(div);
            resolve(response);
        };

        const root = ReactDOM.createRoot(div);
        root.render(<ConfirmationModal onConfirm={handleConfirm} />);
    });
