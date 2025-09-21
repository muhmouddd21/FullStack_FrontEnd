import { TStatusType } from '@customtypes/index';
import useAddTask from '@hooks/useAddTask';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface IAddTodoModalProps {
  show: boolean;
  handleClose: () => void;
}

const AddTaskModal = ({ show, handleClose }: IAddTodoModalProps) => {

  const [title, setTitle] = useState('');
  const [description,setDescription]= useState("");
  const [status, setStatus] = useState<TStatusType>('Pending');
  const {user}=useAppSelector(state => state.Authslice)
  const dispatch = useAppDispatch();

  const { mutate, isPending, isSuccess, isError, error, reset } = useAddTask(); 
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;

    mutate({
      title: title,
      status: status,
      user_id:user?.id as number,
      description:description
    });
  };

  useEffect(() => {
    if (isSuccess) {
        toast("Todo added successfully!");
      setTitle(''); 
      setDescription("");
      handleClose(); 
      // Reset the mutation state after a successful submission
      reset(); 
    }
  }, [isSuccess,dispatch ,handleClose, reset]);

  //  reset the state when the modal is closed to handle cases where the user closes the modal without submitting
  useEffect(() => {
    if (!show) {
      setTitle('');
      reset(); 
    }
  }, [show, reset]);


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Task Title</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                disabled={isPending}
                autoFocus
              />
            </InputGroup>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details..."
              disabled={isPending}
            />
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value as TStatusType)}
              disabled={isPending}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>

          {isError && (
            <Form.Text className="text-danger">
              {error instanceof Error ? error.message : 'An unknown error occurred.'}
            </Form.Text>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isPending || !title.trim()}>
            {isPending ? 'Adding...' : 'Add Todo'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;