import {GenericModal} from '@components/common/index';
import { Button } from 'react-bootstrap';



interface IConfirmDeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  message: string;
}

const ConfirmDeleteModal = ({ show, handleClose, handleConfirm, message }: IConfirmDeleteModalProps) => {
  return (
    <GenericModal show={show} onHide={handleClose} title="Confirm Deletion">
      <p>{message}</p>
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm} className="ms-2">
          Delete
        </Button>
      </div>
    </GenericModal>
  );
};

export default ConfirmDeleteModal;