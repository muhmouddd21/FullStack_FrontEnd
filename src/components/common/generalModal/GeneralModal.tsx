import { Modal } from 'react-bootstrap';

interface IGenericModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  children: React.ReactNode;
}

const GenericModal = ({ show, onHide, title, children }: IGenericModalProps) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default GenericModal;